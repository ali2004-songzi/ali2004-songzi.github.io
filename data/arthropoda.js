window.arthropoda = [
  {
    title: "节肢动物门",
    badge: "门",
    phylum: "节肢动物门",
    latin: "Arthropoda",
    desc: "外骨骼、身体分节分部、附肢分节，种类占动物界80%以上。",
    children: [
      {
        title: "昆虫纲",
        badge: "纲",
        className: "昆虫纲",
        latin: "Insecta",
        desc: "头胸腹三段，6足2对翅。",
        children: [
          {
            title: "鳞翅目",
            badge: "目",
            order: "Lepidoptera",
            latin: "Lepidoptera",
            children: [
              {
                title: "凤蝶科",
                badge: "科",
                family: "Papilionidae",
                latin: "Papilionidae",
                children: [
                  {
                    title: "凤蝶属",
                    badge: "属",
                    genus: "Papilio",
                    latin: "Papilio",
                    children: [
                      {
                        title: "金凤蝶",
                        badge: "种",
                        species: true,
                        latin: "Papilio machaon",
                        slug: "papilio-machaon",
                        image: "images/species/papilio-machaon.jpg",
                        model: "models/species/papilio-machaon.glb",
                        traits: "全球分布最广的凤蝶，幼虫取食伞形科植物。",
                        habit: "成虫常访花取蜜，幼虫取食植物叶片。"
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
        title: "中华绒螯蟹",
        badge: "种",
        species: true,
        latin: "Eriocheir sinensis",
        slug: "eriocheir-sinensis",
        image: "images/species/eriocheir-sinensis.jpg",
        model: "models/species/eriocheir-sinensis.glb",
        traits: "甲壳亚门，长江流域著名河蟹，具螯足和鳃腔。",
        habit: "幼体生活于海水，成体可进入淡水河流，是典型洄游性甲壳类。"
      },
      {
        title: "帝王蝎",
        badge: "种",
        species: true,
        latin: "Pandinus imperator",
        slug: "pandinus-imperator",
        image: "images/species/pandinus-imperator.jpg",
        model: "models/species/pandinus-imperator.glb",
        traits: "蛛形纲，最大毒蝎之一，毒液对人类低毒。",
        habit: "多栖息于热带雨林地表和洞穴中，夜行性，捕食小型无脊椎动物。"
      }
    ]
  }
];