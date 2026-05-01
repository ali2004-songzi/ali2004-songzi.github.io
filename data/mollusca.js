window.mollusca = [
  {
    title: "软体动物门",
    badge: "门",
    phylum: "软体动物门",
    latin: "Mollusca",
    desc: "身体分头、足、内脏团、外套膜，多数具贝壳。",
    children: [
      {
        title: "腹足纲",
        badge: "纲",
        className: "腹足纲",
        latin: "Gastropoda",
        desc: "头部发达，足部肌肉质，多数具螺旋贝壳。",
        children: [
          {
            title: "新腹足目",
            badge: "目",
            order: "Neogastropoda",
            latin: "Neogastropoda",
            children: [
              {
                title: "骨螺科",
                badge: "科",
                family: "Muricidae",
                latin: "Muricidae",
                children: [
                  {
                    title: "荔枝螺属",
                    badge: "属",
                    genus: "Thais",
                    latin: "Thais",
                    children: [
                      {
                        title: "疣荔枝螺",
                        badge: "种",
                        species: true,
                        latin: "Thais clavigera",
                        slug: "thais-clavigera",
                        image: "images/species/thais-clavigera.jpg",
                        model: "models/species/thais-clavigera.glb",
                        traits: "潮间带常见捕食者，以藤壶为食。",
                        habit: "多附着于潮间带岩石上，行动缓慢，利用齿舌捕食。"
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
        title: "大王乌贼",
        badge: "种",
        species: true,
        latin: "Architeuthis dux",
        slug: "architeuthis-dux",
        image: "images/species/architeuthis-dux.jpg",
        model: "models/species/architeuthis-dux.glb",
        traits: "现存最大无脊椎动物，深海巨型头足类。",
        habit: "生活于深海，擅长高速喷水游动，以鱼类和其他头足类为食。"
      },
      {
        title: "珍珠贝",
        badge: "种",
        species: true,
        latin: "Pinctada fucata",
        slug: "pinctada-fucata",
        image: "images/species/pinctada-fucata.jpg",
        model: "models/species/pinctada-fucata.glb",
        traits: "人工育珠主力，外套膜分泌珍珠质。",
        habit: "栖息于浅海海域，常附着于硬质底物，滤食浮游颗粒。"
      }
    ]
  }
];