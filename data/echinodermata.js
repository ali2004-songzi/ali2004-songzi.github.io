window.echinodermata = [
  {
    title: "棘皮动物门",
    badge: "门",
    phylum: "棘皮动物门",
    latin: "Echinodermata",
    desc: "成体五辐射对称，具水管系统，内骨骼由碳酸钙骨板构成。",
    children: [
      {
        title: "海星纲",
        badge: "纲",
        className: "海星纲",
        latin: "Asteroidea",
        desc: "5腕辐射对称，具管足和叉棘。",
        children: [
          {
            title: "钳棘目",
            badge: "目",
            order: "Forcipulatida",
            latin: "Forcipulatida",
            children: [
              {
                title: "蛇海星科",
                badge: "科",
                family: "Ophidiasteridae",
                latin: "Ophidiasteridae",
                children: [
                  {
                    title: "多棘海盘车属",
                    badge: "属",
                    genus: "Asterias",
                    latin: "Asterias",
                    children: [
                      {
                        title: "多棘海盘车",
                        badge: "种",
                        species: true,
                        latin: "Asterias amurensis",
                        slug: "asterias-amurensis",
                        image: "images/species/asterias-amurensis.jpg",
                        model: "models/species/asterias-amurensis.glb",
                        traits: "北太平洋常见海星，可再生断腕。",
                        habit: "多栖息于海底岩石和贝类养殖区，常以贝类和软体动物为食。"
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
        title: "马粪海胆",
        badge: "种",
        species: true,
        latin: "Strongylocentrotus nudus",
        slug: "strongylocentrotus-nudus",
        image: "images/species/strongylocentrotus-nudus.jpg",
        model: "models/species/strongylocentrotus-nudus.glb",
        traits: "海胆纲，经济食用海胆，壳呈半球形。",
        habit: "生活于海底岩礁区域，以海藻和底栖碎屑为食。"
      },
      {
        title: "梅花参",
        badge: "种",
        species: true,
        latin: "Thelenota ananas",
        slug: "thelenota-ananas",
        image: "images/species/thelenota-ananas.jpg",
        model: "models/species/thelenota-ananas.glb",
        traits: "海参纲，最大食用海参之一，体表具梅花状疣足。",
        habit: "多生活于热带浅海海底，以沉积物和有机碎屑为食。"
      }
    ]
  }
];