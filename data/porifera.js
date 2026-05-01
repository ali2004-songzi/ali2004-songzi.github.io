window.porifera = [
  {
    title: "海绵动物门",
    badge: "门",
    phylum: "海绵动物门",
    latin: "Porifera",
    desc: "最原始多细胞动物，无真正组织分化，具水沟系和骨针支撑。",
    children: [
      {
        title: "钙质海绵纲",
        badge: "纲",
        className: "钙质海绵纲",
        latin: "Calcarea",
        desc: "骨针成分为碳酸钙，体型较小。",
        children: [
          {
            title: "钙质海绵目",
            badge: "目",
            order: "钙质海绵目",
            latin: "Calcinea",
            children: [
              {
                title: "白枝海绵科",
                badge: "科",
                family: "白枝海绵科",
                latin: "Leucascidae",
                children: [
                  {
                    title: "白枝海绵属",
                    badge: "属",
                    genus: "白枝海绵属",
                    latin: "Leucascus",
                    children: [
                      {
                        title: "白枝海绵",
                        badge: "种",
                        species: true,
                        latin: "Leucascus simplex",
                        slug: "leucascus-simplex",
                        image: "images/species/leucascus-simplex.jpg",
                        model: "models/species/leucascus-simplex.glb",
                        traits: "全球广布的浅海小型海绵。",
                        habit: "通常附着于海底岩石或珊瑚基底上，以滤食方式摄取水中微粒。"
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
        title: "浴海绵",
        badge: "种",
        species: true,
        latin: "Spongia officinalis",
        slug: "spongia-officinalis",
        image: "images/species/spongia-officinalis.jpg",
        model: "models/species/spongia-officinalis.glb",
        traits: "寻常海绵纲，骨针为角质纤维，人类最早利用的天然海绵。",
        habit: "生活于温暖海域，常附着于硬质海底，依靠水流滤食微小有机颗粒。"
      },
      {
        title: "偕老同穴",
        badge: "种",
        species: true,
        latin: "Euplectella aspergillum",
        slug: "euplectella-aspergillum",
        image: "images/species/euplectella-aspergillum.jpg",
        model: "models/species/euplectella-aspergillum.glb",
        traits: "六放海绵纲，玻璃质骨针构成精美笼状结构。",
        habit: "多栖息于深海软泥底质，通过体壁孔道进行滤食，体内常与虾类形成共生关系。"
      }
    ]
  }
];