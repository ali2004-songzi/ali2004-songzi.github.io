window.platyhelminthes = [
  {
    title: "扁形动物门",
    badge: "门",
    phylum: "扁形动物门",
    latin: "Platyhelminthes",
    desc: "两侧对称、三胚层、无体腔，背腹扁平，多数寄生。",
    children: [
      {
        title: "涡虫纲",
        badge: "纲",
        className: "涡虫纲",
        latin: "Turbellaria",
        desc: "自由生活，体表具纤毛，再生能力强。",
        children: [
          {
            title: "三肠目",
            badge: "目",
            order: "三肠目",
            latin: "Tricladida",
            children: [
              {
                title: "三角涡虫科",
                badge: "科",
                family: "三角涡虫科",
                latin: "Dugesiidae",
                children: [
                  {
                    title: "三角涡虫属",
                    badge: "属",
                    genus: "Dugesia",
                    latin: "Dugesia",
                    children: [
                      {
                        title: "三角真涡虫",
                        badge: "种",
                        species: true,
                        latin: "Dugesia japonica",
                        slug: "dugesia-japonica",
                        image: "images/species/dugesia-japonica.jpg",
                        model: "models/species/dugesia-japonica.glb",
                        traits: "再生研究的模式生物，切断后可长成完整个体。",
                        habit: "生活于淡水环境，常见于溪流、池塘和清洁的静水中。"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "日本血吸虫",
        badge: "种",
        species: true,
        latin: "Schistosoma japonicum",
        slug: "schistosoma-japonicum",
        image: "images/species/schistosoma-japonicum.jpg",
        model: "models/species/schistosoma-japonicum.glb",
        traits: "吸虫纲，引发血吸虫病，生活史需钉螺宿主。",
        habit: "寄生于人和哺乳动物血管系统，传播依赖淡水螺类中间宿主。"
      },
      {
        title: "猪带绦虫",
        badge: "种",
        species: true,
        latin: "Taenia solium",
        slug: "taenia-solium",
        image: "images/species/taenia-solium.jpg",
        model: "models/species/taenia-solium.glb",
        traits: "绦虫纲，成虫寄生人体小肠，幼虫致囊虫病。",
        habit: "通过未煮熟猪肉传播，成虫寄生于宿主体内肠道。"
      }
    ]
  }
];