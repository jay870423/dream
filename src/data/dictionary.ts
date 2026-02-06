export type DictionaryEntry = {
  symbol: string;
  meaning: string;
  actions: string[];
};

export const dictionaryEntries: DictionaryEntry[] = [
  {
    symbol: "水",
    meaning: "情绪流动、直觉与潜意识能量的聚集。",
    actions: ["记录当下情绪的来源", "安排一次独处或清理式的活动"],
  },
  {
    symbol: "海",
    meaning: "广阔潜能与未知领域，可能暗示新的周期。",
    actions: ["为新计划设定可控边界", "接受短期的不确定性"],
  },
  {
    symbol: "列车",
    meaning: "人生节奏与转折点，关于选择与时机。",
    actions: ["梳理近期关键决定", "给自己预留缓冲时间"],
  },
  {
    symbol: "门",
    meaning: "通往新身份或新阶段的入口。",
    actions: ["明确你想进入的领域", "为转变做小规模尝试"],
  },
  {
    symbol: "城市",
    meaning: "社会角色、责任与结构。",
    actions: ["评估当前的职责负荷", "调整个人节奏与边界"],
  },
  {
    symbol: "森林",
    meaning: "内在探索、未知与潜藏的力量。",
    actions: ["安排一次深度学习或反思", "寻找新的灵感来源"],
  },
  {
    symbol: "飞行",
    meaning: "自由、突破限制与视角提升。",
    actions: ["设定更高的目标", "换一种方式看待现状"],
  },
  {
    symbol: "光",
    meaning: "希望、清晰与灵感。",
    actions: ["记录近期的灵感", "让自己更接近让你兴奋的人与事"],
  },
  {
    symbol: "镜子",
    meaning: "自我认知与真实状态的反映。",
    actions: ["整理你的真实需求", "确认你想成为的样子"],
  },
  {
    symbol: "雨",
    meaning: "情绪释放、疗愈与情感更新。",
    actions: ["给情绪一个出口", "尝试轻度社交或写作"],
  },
  {
    symbol: "山",
    meaning: "目标、挑战与内在驱动力。",
    actions: ["拆解目标里最难的一部分", "建立支持系统"],
  },
  {
    symbol: "桥",
    meaning: "过渡期、连接与关系修复。",
    actions: ["梳理关键关系", "安排一次真诚沟通"],
  },
  {
    symbol: "火",
    meaning: "激情、转化或即将爆发的能量。",
    actions: ["把能量投入到具体计划", "避免过度消耗"],
  },
  {
    symbol: "房间",
    meaning: "内在空间与安全感。",
    actions: ["清理你最重要的生活空间", "建立稳定的日常仪式"],
  },
  {
    symbol: "时间",
    meaning: "对变化的焦虑或对未来的期待。",
    actions: ["把焦虑写下来", "设定短期可执行的计划"],
  },
];

export const dictionaryIndex = dictionaryEntries.reduce<Record<string, DictionaryEntry>>(
  (acc, entry) => {
    acc[entry.symbol] = entry;
    return acc;
  },
  {}
);
