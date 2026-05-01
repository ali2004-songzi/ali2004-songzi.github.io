window.chordata = [
  {
    title: "脊索动物门",
    badge: "门",
    phylum: "脊索动物门",
    latin: "Chordata",
    desc: "胚胎期具脊索、背神经管、鳃裂，脊椎动物亚门占绝对优势。",
    children: [
      {
        title: "脊椎动物亚门",
        badge: "亚门",
        subphylum: "脊椎动物亚门",
        latin: "Vertebrata",
        children: [
          {
            title: "哺乳纲",
            badge: "纲",
            className: "哺乳纲",
            latin: "Mammalia",
            desc: "胎生、哺乳、体表被毛。",
            children: [
              {
                title: "灵长目",
                badge: "目",
                order: "Primates",
                latin: "Primates",
                children: [
                  {
                    title: "人科",
                    badge: "科",
                    family: "Hominidae",
                    latin: "Hominidae",
                    children: [
                      {
                        title: "人属",
                        badge: "属",
                        genus: "Homo",
                        latin: "Homo",
                        children: [
                          {
                            title: "智人",
                            badge: "种",
                            species: true,
                            latin: "Homo sapiens",
                            slug: "homo-sapiens",
                            image: "images/species/homo-sapiens.jpg",
                            model: "models/species/homo-sapiens.glb",
                            traits: "现代人类唯一现存物种。",
                            habit: "高度社会化，广泛分布于全球，具有复杂语言与文化能力。"
                          }
                        ]
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
        title: "文昌鱼",
        badge: "种",
        species: true,
        latin: "Branchiostoma lanceolatum",
        slug: "branchiostoma-lanceolatum",
        image: "images/species/branchiostoma-lanceolatum.jpg",
        model: "models/species/branchiostoma-lanceolatum.glb",
        traits: "头索亚门，脊索贯穿全身，无真正脊椎。",
        habit: "栖息于浅海沙底，半埋沙中，通过鳃裂过滤摄食。"
      },
      {
        title: "大马哈鱼",
        badge: "种",
        species: true,
        latin: "Oncorhynchus keta",
        slug: "oncorhynchus-keta",
        image: "images/species/oncorhynchus-keta.jpg",
        model: "models/species/oncorhynchus-keta.glb",
        traits: "鱼纲，溯河洄游典型代表，幼体在淡水生长，成体入海。",
        habit: "幼鱼在河流中生长，成年后入海并在繁殖季洄游至淡水产卵。"
      }
    ]
  }
];