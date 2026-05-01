window.nematoda = [
  {
    title: "线形动物门",
    badge: "门",
    phylum: "线形动物门",
    latin: "Nematoda",
    desc: "体表有角质层，圆柱形，有口有肛门，假体腔。",
    children: [
      {
        title: "色矛纲",
        badge: "纲",
        className: "色矛纲",
        latin: "Chromadorea",
        desc: "种类最多，含自由生活与寄生种类。",
        children: [
          {
            title: "小杆目",
            badge: "目",
            order: "小杆目",
            latin: "Rhabditida",
            children: [
              {
                title: "小杆科",
                badge: "科",
                family: "Rhabditidae",
                latin: "Rhabditidae",
                children: [
                  {
                    title: "杆形线虫属",
                    badge: "属",
                    genus: "Caenorhabditis",
                    latin: "Caenorhabditis",
                    children: [
                      {
                        title: "秀丽隐杆线虫",
                        badge: "种",
                        species: true,
                        latin: "Caenorhabditis elegans",
                        slug: "caenorhabditis-elegans",
                        image: "images/species/caenorhabditis-elegans.jpg",
                        model: "models/species/caenorhabditis-elegans.glb",
                        traits: "首个完成全基因组测序的多细胞动物，发育生物学模式生物。",
                        habit: "自由生活于土壤和腐殖质中，以细菌为食。"
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
        title: "人蛔虫",
        badge: "种",
        species: true,
        latin: "Ascaris lumbricoides",
        slug: "ascaris-lumbricoides",
        image: "images/species/ascaris-lumbricoides.jpg",
        model: "models/species/ascaris-lumbricoides.glb",
        traits: "蛔目，人体最大寄生线虫，感染率超10亿人。",
        habit: "寄生于人体小肠，虫卵随污染食物或水进入宿主体内。"
      },
      {
        title: "旋毛虫",
        badge: "种",
        species: true,
        latin: "Trichinella spiralis",
        slug: "trichinella-spiralis",
        image: "images/species/trichinella-spiralis.jpg",
        model: "models/species/trichinella-spiralis.glb",
        traits: "旋毛目，幼虫寄生肌肉，致旋毛虫病。",
        habit: "常通过生食或半生食含虫肉类进入人体或其他哺乳动物体内。"
      }
    ]
  }
];