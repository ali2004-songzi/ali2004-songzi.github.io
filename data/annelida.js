window.annelida = [
  {
    title: "环节动物门",
    badge: "门",
    phylum: "环节动物门",
    latin: "Annelida",
    desc: "身体分节，具真体腔，闭管式循环系统。",
    children: [
      {
        title: "寡毛纲",
        badge: "纲",
        className: "寡毛纲",
        latin: "Oligochaeta",
        desc: "刚毛直接着生体壁，无疣足。",
        children: [
          {
            title: "单向蚓目",
            badge: "目",
            order: "单向蚓目",
            latin: "Haplotaxida",
            children: [
              {
                title: "正蚓科",
                badge: "科",
                family: "Lumbricidae",
                latin: "Lumbricidae",
                children: [
                  {
                    title: "环毛蚓属",
                    badge: "属",
                    genus: "Pheretima",
                    latin: "Pheretima",
                    children: [
                      {
                        title: "参环毛蚓",
                        badge: "种",
                        species: true,
                        latin: "Pheretima aspergillum",
                        slug: "pheretima-aspergillum",
                        image: "images/species/pheretima-aspergillum.jpg",
                        model: "models/species/pheretima-aspergillum.glb",
                        traits: "中国药用蚯蚓主力，《本草纲目》称“地龙”。",
                        habit: "多生活于湿润土壤中，喜腐殖质丰富环境，昼伏夜出。"
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
        title: "医蛭",
        badge: "种",
        species: true,
        latin: "Hirudo medicinalis",
        slug: "hirudo-medicinalis",
        image: "images/species/hirudo-medicinalis.jpg",
        model: "models/species/hirudo-medicinalis.glb",
        traits: "蛭纲，古代放血疗法工具，唾液含抗凝血蛭素。",
        habit: "多栖息于淡水水域，吸食脊椎动物血液。"
      },
      {
        title: "沙蚕",
        badge: "种",
        species: true,
        latin: "Perinereis aibuhitensis",
        slug: "perinereis-aibuhitensis",
        image: "images/species/perinereis-aibuhitensis.jpg",
        model: "models/species/perinereis-aibuhitensis.glb",
        traits: "多毛纲，海洋底栖饵料生物，具疣足和刚毛。",
        habit: "常生活于海滩泥沙或潮间带底泥中，以碎屑或小型生物为食。"
      }
    ]
  }
];