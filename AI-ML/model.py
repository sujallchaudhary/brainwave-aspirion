import os
os.environ["WANDB_DISABLED"] = "true"

import torch
from trl import SFTTrainer
from datasets import load_dataset
from transformers import TrainingArguments, TextStreamer
from unsloth import FastLanguageModel, is_bfloat16_supported


max_seq_length = 1024
dtype = None
load_in_4bit = True


model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = "unsloth/Meta-Llama-3.1-8B-bnb-4bit",
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)


model = FastLanguageModel.get_peft_model(
    model,
    r=8,
    lora_alpha=16,
    lora_dropout=0,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    use_gradient_checkpointing = True,
    random_state=3407,
)


career_prompt = """Given the individual's profile:
{input}

Recommend a suitable career path and explain why.

Response: {output}"""


def format_prompts(examples):
    formatted = []
    for input_data, output in zip(examples["Input"], examples["Output"]):
        text = career_prompt.format(
            input=input_data,
            output=output
        )
        formatted.append(text)
    return {"text": formatted}

dataset = load_dataset("csv", data_files="career_recommendations.csv", split="train")
dataset = dataset.map(format_prompts, batched=True)

training_args = TrainingArguments(
    per_device_train_batch_size = 1,
    gradient_accumulation_steps = 8,
    warmup_ratio = 0.03,
    max_steps = 100,
    learning_rate = 1e-4,
    fp16 = not is_bfloat16_supported(),
    bf16 = is_bfloat16_supported(),
    logging_steps = 1,
    optim = "adamw_8bit",
    weight_decay = 0.05,
    lr_scheduler_type = "cosine",
    seed = 3407,
    output_dir = "outputs",
    report_to = [],
)


trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = max_seq_length,
    dataset_num_proc = 2,
    packing = False,
    args = training_args,
)


trainer_stats = trainer.train()

FastLanguageModel.for_inference(model)


def generate_career_recommendation(profile):
    prompt = career_prompt.format(input=profile, output="")
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(
        **inputs,
        max_new_tokens=128,
        temperature=0.7,
        top_p=0.9,
        use_cache=True
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)