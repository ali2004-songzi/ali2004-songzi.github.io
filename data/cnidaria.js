window.cnidaria = [
  {
    title: "刺胞动物门",
    badge: "门",
    phylum: "刺胞动物门",
    latin: "Cnidaria",
    desc: "辐射对称，具刺细胞，有口无肛门，分水螅型与水母型。",
    children: [
      {
        title: "珊瑚纲",
        badge: "纲",
        className: "珊瑚纲",
        latin: "Anthozoa",
        desc: "仅水螅型，无水母型，多数分泌石灰质骨骼。",
        children: [
          {
            title: "石珊瑚目",
            badge: "目",
            order: "石珊瑚目",
            latin: "Scleractinia",
            children: [
              {
                title: "鹿角珊瑚科",
                badge: "科",
                family: "鹿角珊瑚科",
                latin: "Acroporidae",
                children: [
                  {
                    title: "鹿角珊瑚属",
                    badge: "属",
                    genus: "Acropora",
                    latin: "Acropora",
                    children: [
                      {
                        title: "鹿角珊瑚",
                        badge: "种",
                        species: true,
                        latin: "Acropora cervicornis",
                        slug: "acropora-cervicornis",
                        image: "images/species/acropora-cervicornis.jpg",
                        model: "models/species/acropora-cervicornis.glb",
                        traits: "珊瑚礁主要建造者，全球热带海域关键生态种。",
                        habit: "栖息于浅海清澈海域，依赖共生虫黄藻进行能量获取。"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: "海葵",
            badge: "种",
            species: true,
            latin: "Anthopleura xanthogrammica",
            slug: "anthopleura-xanthogrammica",
            image: "images/species/anthopleura-xanthogrammica.jpg",
            model: "models/species/anthopleura-xanthogrammica.glb",
            traits: "固着生活无骨骼，触手含剧毒刺细胞。",
            habit: "常附着于岩石缝隙或潮间带，利用触手捕食小型甲壳类与鱼类。"
          }
        ]
      },
      {
        title: "海月水母",
        badge: "种",
        species: true,
        latin: "Aurelia aurita",
        slug: "aurelia-aurita",
        image: "images/species/aurelia-aurita.jpg",
        model: "models/species/aurelia-aurita.glb",
        traits: "钵水母纲，最常见水母，伞状透明体。",
        habit: "漂浮于近海海域，随海流移动，以浮游生物为食。"
      }
    ]
  }
];