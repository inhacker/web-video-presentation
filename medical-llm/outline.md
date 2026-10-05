# Video Outline — John Snow Labs Medical LLMs

> **主题**：`newsroom`（报社）—— 报纸奶油底 + 墨黑衬线 + 报头红，评测特稿气质
> **语言 / 平台**：英文口播 · B 站节奏
> **总时长**：约 8 分 29 秒（口播 1278 词 ÷ 2.5 词/秒，逐步取整、每步最少 3 秒后累加）
> **章节数**：12 章 / 85 步
> **来源**：article.md（John Snow Labs 官方文档；所有基准数据均为厂商自测）。信息池里的 § 指 article.md 的小节，¶ 指段落

---

## 1. coldopen — 冷开场：病人数据出不了门（4 steps · ~24s）

**信息池**：
- 对比：closed frontier models can't run on your data —— §Medical LLMs ¶2
- 名称：GPT 5.5 / Claude Opus 4.8 / Gemini 3.5 Flash —— §Medical LLMs ¶2
- 定位：on-premise or private-cloud, HIPAA-friendly —— §Medical LLMs ¶2

**开发计划**：

- step 1 (~6s) — (反差对照) 医院防火墙边界：墙内一份病历，墙外云端的 GPT 5.5，两者之间的通路被截断
- step 2 (~7s) — (反转) 墙内一个本地模型，分数高于墙外前沿模型 —— 标语 "What if the one inside scores higher?"
- step 3 (~7s) — (引出主角) John Snow Labs · Medical LLMs + "Let's check their numbers."
- step 4 (~4s) — (预告诚实) 一张基准表，其中几行带 "they lose here" 标记

口播节选：
> Your hospital probably can't send patient records to GPT 5.5. Not without a lot of paperwork.

---

## 2. why-private — 为什么要专用 + 私有部署（8 steps · ~43s）

**信息池**：
- 论断：domain-specific, task-optimized LLMs consistently outperform general-purpose LLMs in healthcare —— §Medical LLMs ¶1
- 模态：multimodal (text + image)；locked John Snow Labs identity —— §Medical LLMs ¶2
- 任务：clinical reasoning / diagnostics / research comprehension / genetic analysis —— §Medical LLMs ¶3
- 场景：clinical assessment / medical QA / biomedical research synthesis / diagnostic decision support —— §Medical LLMs › Introduction ¶1

**开发计划**：

- step 1 (~4s) — (论点) 两个模型剪影：general-purpose vs domain-specific —— hero "Specialized beats general."
- step 2 (~5s) — (证据来源) 两个来源标签：academic research / industry benchmarks
- step 3 (~5s) — (引出一对) 两张型号卡：Medical LLM Medium / Medical LLM Small
- step 4 (~6s) — (能力) text + image 两个输入口 + locked JSL identity 标签
- step 5 (~10s) — (部署对比) 左：他人云端的三家前沿模型；右：本地机房 / 私有云，数据留在右侧闭环内
- step 6 (~7s) — (合规) HIPAA-friendly 徽标 + 原话 "without giving up frontier-grade medical accuracy"
- step 7 (~3s) — (用途 1/2) clinical reasoning + diagnostics：一条推理链 symptoms → findings → differential → diagnosis（示意）
- step 8 (~3s) — (用途 2/2) research comprehension + genetic analysis：摘要高亮 + DNA 序列标出变异位点；前两项灰化保留

口播节选：
> In healthcare, they argue, a specialized model beats a general one.

---

## 3. flagship-pair — Medium 与 Small：硬件与部署（7 steps · ~44s）

**信息池**：
- 数字：Medium ~67 GB / Small ~25 GB；262K；KV 16 GB / 8 GB —— §Medical LLMs Offering 表
- 并行：Medium 2,4,8；Small 1,2,4,8 —— 同表
- 注：fp16/bf16，按 DJL LMI Deployment Guide 计算 —— 同表 Note
- 平台：On-Premise / AWS / Azure / Databricks / Snowflake —— 同表

**开发计划**：

- step 1 (~6s) — (数据) 显存条：Medium ~67 GB
- step 2 (~4s) — (对比) Medium 67 GB 与 Small 25 GB 两条并排，Small 旁注 "one commodity GPU"
- step 3 (~6s) — (量感) 262K token 上下文 = 一大叠病历页，标注 "hundreds of pages"
- step 4 (~9s) — (构成拆解) 显存条分为 weights (fp16/bf16) + KV cache 两段：Medium 16 GB / Small 8 GB
- step 5 (~6s) — (并行) GPU 格子：Medium 2/4/8 张；Small 1/2/4/8 张
- step 6 (~4s) — (平台) 五个部署目标：On-Premise / AWS / Azure / Databricks / Snowflake
- step 7 (~9s) — (定位) Small = Compact "beats much larger general models on MedHELM"；Medium = Flagship "#1 mean win rate"（厂商标签）

口播节选：
> Start with hardware. Medium is the flagship. It wants about 67 gigabytes of GPU memory.

---

## 4. small-models — 小模型货架与专科模型（10 steps · ~65s）

**信息池**：
- 规模：1B–10B，量化，CPU 可跑，支持 GPU 加速 —— §Medical Small LLMs ¶1
- MedM_v3：14B · disk 8.2G/14G/21.9G · 24GB · 79/84/253 tok/s · 32,768（注意：14B 超出原文说的 1B–10B 区间）—— §Medical Small LLMs 表
- NER_v4 / NER_v5 / Text2SOAP_v1 / RAG_v1 / VLM_3B_v1 / NER_VLM_2B_v2 规格 —— 同表
- 其他：MedS_v3 3.5B / MedS_4B_v5 / MedS_8B_v4（83/84/272 tok/s）—— 同表
- 授权：fully included under the Healthcare NLP license；Colab notebook —— §Medical Small LLMs ¶1 及表后

**开发计划**：

- step 1 (~6s) — (规模) 参数刻度尺 1B–10B，一排小模型落在刻度上
- step 2 (~7s) — (部署) 量化档位 q4 / q8 / q16 + CPU 图标，GPU 标为可选加速
- step 3 (~9s) — (主力) MedM v3 卡片：14B · 24 GB · 32,768 ctx · summaries / Q&A / RAG / chat，刻度尺上它越出 10B
- step 4 (~6s) — (NER) 一段示例临床文本，医学实体被标注并连线 —— JSL_MedS_NER_v4
- step 5 (~4s) — (试验入组) 入组条件文本 → 结构化清单 —— JSL_MedS_NER_v5
- step 6 (~5s) — (SOAP) 杂乱病程记录 → S / O / A / P 四栏 —— JSL_MedS_Text2SOAP_v1
- step 7 (~6s) — (RAG) 管线：query → retriever → [JSL_MedS_RAG_v1] → answer
- step 8 (~7s) — (多模态) 医学图片占位卡 + 抽出的实体框 —— VLM_3B_v1 / NER_VLM_2B_v2
- step 9 (~7s) — (集成) Healthcare NLP pipeline 里的一个组件槽 + "included in Healthcare NLP license"
- step 10 (~8s) — (范围) 上下文窗口刻度 32K → 131K + Colab notebook 占位卡

口播节选：
> There's also a whole shelf of smaller models. Most are one to ten billion parameters.

---

## 5. openmed — OpenMed：考试型基准（10 steps · ~53s）

**信息池**：
- 组成：MedQA, PubMedQA + 6 MMLU medical subjects —— §OpenMed ¶1
- Medium 逐项：96.2 / 82 / 93.5 / 97.5 / 94.3 / 93.4 / 99 / 96 → 93.99 —— §OpenMed 表
- Small 逐项：92 / 76 / 89 / 93 / 97 / 86 / 98 / 94 → 90.63 —— 同表
- Medium 落后项：Anatomy 93.5 (vs 94.1)、College Bio 94.3 (vs 99.3)、Med Genetics 99 (vs 100)、Prof Medicine 96 (vs 98) —— 同表

**开发计划**：

- step 1 (~3s) — (章节题) hero：OpenMed
- step 2 (~5s) — (组成) 8 个测试集标签：MedQA / PubMedQA + 6 个 MMLU 医学科目
- step 3 (~3s) — (hero 数字) 93.99 —— Medical LLM Medium 平均分
- step 4 (~6s) — (排行) 四条横条：Medium 93.99 / GPT 5.5 93.28 / Claude Opus 4.8 93.21 / Gemini 3.5 Flash 92.94
- step 5 (~5s) — (差距放大) 93.99 与 93.28 之差：+0.71
- step 6 (~9s) — (反例) 8 科网格中 Medium 落后的 4 科被标出：Anatomy / College Biology / Medical Genetics / Professional Medicine；College Biology 99.3 vs 94.3 放大
- step 7 (~5s) — (反例) Medical Genetics：前沿 100 vs Medium 99
- step 8 (~7s) — (领先项) PubMedQA：Medium 82 vs 前沿 74–76.5
- step 9 (~4s) — (小幅领先) MedQA：96.2 vs 95
- step 10 (~6s) — (Small) 90.63 平均分 + "fits on one GPU"

口播节选：
> Now the benchmarks, starting with OpenMed.

---

## 6. medhelm — MedHELM：贴近临床的基准（6 steps · ~40s）

**信息池**：
- 范围：13 tasks across documentation, coding, safety, dialogue, reasoning —— §MedHELM ¶1
- mean win rate：77.78 / 70.95 / 73.56 / 72.06 / 71.61 —— §MedHELM 表
- 险胜项：MedDialog 76.3 vs 76.2、MediQA 78.1 vs 76.9、MTSamples 73.8 vs 72 —— 同表
- 其他：MedCalc 48、HeadQA 93.9、EHRSQL 34（Gemini 14）—— 同表

**开发计划**：

- step 1 (~4s) — (对比) 左：exam questions (OpenMed)；右：clinical work (MedHELM)
- step 2 (~6s) — (范围) 13 个任务格子，按 documentation / coding / safety / dialogue / reasoning 分色
- step 3 (~7s) — (定义) mean win rate：逐任务对决，赢的比例
- step 4 (~6s) — (hero 数字) 77.78 vs 下一名 GPT 5.5 73.56
- step 5 (~9s) — (计数) 13 格中 12 格归 Medium，1 格空着；MedDialog 76.3 vs 76.2 这种险胜格带小注
- step 6 (~8s) — (最大差距) Medec：85 vs 最佳前沿 70 → +15

口播节选：
> OpenMed is exam questions. MedHELM is closer to real clinical work.

---

## 7. medhelm-edges — MedHELM：强项与短板（5 steps · ~29s）

**信息池**：
- MedicationQA 80.9 vs 71.4；PubMedQA 82 vs 76 —— §MedHELM 表
- Med-Hallu 96 / 95 / 92 / 92 / 90 —— 同表
- RaceBias 88 / 86 / 91 / 91 / 91 —— 同表
- 厂商结论：largest margins on Medec +15, MedicationQA +9.5, PubMedQA +6, hallucination —— §MedHELM 表后

**开发计划**：

- step 1 (~4s) — (增量) MedicationQA +9.5 / PubMedQA +6
- step 2 (~7s) — (幻觉) Med-Hallu：Medium 96 / Small 95 / 前沿最高 92
- step 3 (~6s) — (短板) 第 13 格：RaceBias —— Medium 88 vs 前沿 91
- step 4 (~4s) — (提醒) 标语 "Bias testing matters? Remember this one."
- step 5 (~8s) — (Small) 70.95，低于三家前沿（73.56 / 72.06 / 71.61）；第 3 章那句 "beats much larger models" 旁加星号

口播节选：
> Medication questions, plus 9.5. Research reading on PubMedQA, plus 6.

---

## 8. safety — 平均分与红队测试（8 steps · ~43s）

**信息池**：
- 平均：OpenMed 93.99 vs 93.14；MedHELM 77.78 vs 72.41 —— §Medical LLMs › How the Models Compare
- 红队：1000 questions / 148 categories；940 / 850 / 830 / 790 —— §Red-Teaming
- 原话："the metric that decides whether a model is safe in front of clinicians" —— §Medical LLMs › How the Models Compare

**开发计划**：

- step 1 (~3s) — (过渡) 标语 "Step back."
- step 2 (~4s) — (对比) OpenMed 平均：frontier 93.14 vs Medium 93.99
- step 3 (~6s) — (对比) MedHELM 平均：frontier 72.41 vs Medium 77.78，差距明显更宽
- step 4 (~4s) — (规模) 1000 个对抗问题组成的点阵，分属 148 个类别
- step 5 (~3s) — (hero 数字) 点阵中 ~940 个通过 → 94%
- step 6 (~7s) — (排行) GPT 5.5 850 (85%) / Claude Opus 4.8 830 (83%) / Gemini 3.5 Flash 790 (79%)
- step 7 (~8s) — (结论) "Smaller model, most robust in this test"（厂商结论）+ 小注 "Small: not reported"
- step 8 (~8s) — (幻觉) Med-Hallu：两个 JSL 模型都高于所有前沿模型；厂商原话 "decides whether a model is safe in front of clinicians"

口播节选：
> Now step back and look at averages.

---

## 9. vision-ocr — 第二个家族：Vision OCR（8 steps · ~54s）

**信息池**：
- 论断：task-optimized OCR beats general frontier on grounding + schema-valid output —— §Vision OCR ¶1
- Vision-OCR-LLM：~6 GB · 32K · KV 4 GB · TP 1,2,4；Structured：~32 GB · 128K · KV 17 GB —— §Vision OCR Offering 表
- 注：typical ~8K → ~19 GB / ~3 GB；~8% overhead —— 同表 Note
- 隐私：keeps PII and PHI inside your infrastructure —— §Vision OCR ¶2

**开发计划**：

- step 1 (~4s) — (章节题) hero：Vision OCR
- step 2 (~6s) — (论点) task-optimized OCR vs general frontier
- step 3 (~9s) — (两件事) 一页表单：左半单词带 bounding box；右半对应 JSON
- step 4 (~8s) — (型号) Vision OCR LLM 卡：grounding specialist · ~6 GB · 32K
- step 5 (~7s) — (型号) Vision OCR Structured LLM 卡：document → JSON · ~32 GB · 128K
- step 6 (~6s) — (最坏情况) 两张卡上的显存数标为 "at max context"；一页 OCR ≈ 8K tokens
- step 7 (~8s) — (典型情况) 8K 下：Vision OCR LLM ~3 GB / Structured ~19 GB，各一张 GPU
- step 8 (~6s) — (隐私) PII / PHI 标签留在自家基础设施边界内

口播节选：
> The same page covers a second family. Vision OCR.

---

## 10. ocr-tables-grounding — OCR 基准：表格与定位（10 steps · ~55s）

**信息池**：
- TEDS-S：0.784 / 0.704 / 0.684 / 0.668 —— §Table Structure Recognition
- 数据：PubTabNet val，50 tables，5 complexity quintiles × 10 —— 同节 Dataset
- FUNSD：1 − canonical CER；IoU 0.78；0.938 / 0.848 / 0.921 / 0.968 —— §Bounding-Box Grounding
- 原始 canonical CER 0.039（AWS Marketplace 公布值）—— §Vision OCR › How the Models Compare

**开发计划**：

- step 1 (~5s) — (数据集) 50 张 PubTabNet 表格，按复杂度 5 档 × 10 张
- step 2 (~5s) — (定义) TEDS-S：只比较表格结构
- step 3 (~7s) — (排行) Vision OCR LLM 0.784 / GPT 5.5 0.704 / Claude 0.684 / Gemini 0.668，+8 points
- step 4 (~4s) — (数据集) FUNSD 2019 测试集：全部 50 份表单
- step 5 (~7s) — (机制) 预测框与真实区域 IoU ≥ 0.78 才算匹配
- step 6 (~5s) — (机制) 匹配框内文字的 CER，得分 = 1 − CER
- step 7 (~6s) — (排行) Vision OCR LLM 0.938 / Claude 0.921 / GPT 0.848
- step 8 (~3s) — (反例) Gemini 0.968 排第一
- step 9 (~8s) — (厂商解释) 局部覆盖 vs 整页覆盖示意
- step 10 (~5s) — (存疑) 小注 "coverage numbers: not published"

口播节选：
> Take tables. They pulled 50 from PubTabNet, balanced from simple to very dense.

---

## 11. ocr-json — OCR 基准：结构化 JSON（4 steps · ~21s）

**信息池**：
- JSON accuracy：0.708 / 0.623 / 0.643 / 0.813 —— §Structured JSON Extraction
- 数据：getomni-ai/ocr-benchmark test split，前 100 份 —— 同节 Dataset
- AWS Marketplace 公布值 0.714；same prompt, 0 errored docs —— §Vision OCR › How the Models Compare

**开发计划**：

- step 1 (~4s) — (数据集) OmniOCR 测试集前 100 份文档
- step 2 (~7s) — (排行) Vision OCR Structured LLM 0.708 / GPT 0.623 / Claude 0.643
- step 3 (~3s) — (反例) Gemini 0.813 排第一
- step 4 (~7s) — (方法) same prompt · 0 errored docs · vendor's own harness

口播节选：
> And for JSON, they used 100 documents from the OmniOCR benchmark.

---

## 12. takeaway — 总结与行动（5 steps · ~38s）

**信息池**：
- 原话："The whole family runs single-GPU on-premise" —— §Vision OCR › How the Models Compare
- 结论：OpenMed 93.99 vs 93.14；MedHELM 77.78 vs 72.41 —— §Medical LLMs › How the Models Compare
- 合作：decision support tools / clinical chatbots / research platforms —— §Partner With Us

**开发计划**：

- step 1 (~8s) — (结论) 医学文本：两个基准都领先，MedHELM 领先幅度大
- step 2 (~7s) — (结论) OCR：表格领先；定位和 JSON 由 Gemini 领先
- step 3 (~7s) — (不变) 防火墙内 + 多数单 GPU
- step 4 (~9s) — (提醒) "Vendor's own numbers — test on your data."
- step 5 (~7s) — (CTA) 文档链接 + Colab notebook

口播节选：
> So, on medical text, Medium beats the frontier on both benchmarks. The wide lead is on MedHELM, the clinical-work one.

---

## 素材清单

全片以数据可视化为主，基本都能用 CSS / SVG 画出来。

### 1. coldopen
- ✓ 防火墙、云端、病历文件：SVG 绘制
### 2. why-private
- ✓ 模型剪影、机房 / 云端对比、HIPAA 徽标（文字徽标，不仿官方标志）：SVG 绘制
### 3. flagship-pair
- ✓ 显存条、GPU 格子、页面堆叠：SVG 绘制
### 4. small-models
- ✓ 临床文本、试验入组条件、SOAP 四栏：自拟示例文本，画面标注 "illustrative"
- ⚠️ 医学图片（VLM 演示）：用 placeholder 占位卡，或由你提供一张可公开使用的医学影像
### 5–8. openmed / medhelm / medhelm-edges / safety
- ✓ 全部分数图表：直接用 article 表格数据
### 9–11. vision-ocr / ocr-tables-grounding / ocr-json
- ⚠️ 表单 / 表格样例：用 SVG 画的示意表单代替，或由你提供 FUNSD / PubTabNet 样例截图
### 12. takeaway
- ⚠️ 文档链接和 Colab notebook 链接：确认你要在视频描述里放的最终链接
### 全片
- ✓ 不使用任何公司 logo，统一用文字名称
