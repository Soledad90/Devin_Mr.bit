/* ═══════ DATA (từ file Excel TVS) ═══════ */
var PRODUCTS = [
  {
    id: 'RAINIS_AH', name: 'RAINIS AH', type: 'tall', image: 'images/products/RAINIS_AH.jpg', hasCalf: true,
    colors: [{name:'Xanh Rêu / Xám', hex:'#3d5a3e'}],
    sizes: [
      {uk:'5',  us:'6',  eur:38, h:325, bg:212,   bw:82,  ig:215, cg:374, fl:240},
      {uk:'6',  us:'7',  eur:39, h:325, bg:218.4, bw:87,  ig:221, cg:382, fl:247},
      {uk:'7',  us:'8',  eur:40, h:330, bg:224.7, bw:92,  ig:227, cg:390, fl:255},
      {uk:'8',  us:'9',  eur:41, h:330, bg:231.1, bw:97,  ig:233, cg:398, fl:263},
      {uk:'9',  us:'10', eur:42, h:335, bg:237.4, bw:102, ig:239, cg:406, fl:273},
      {uk:'10', us:'11', eur:43, h:335, bg:243.8, bw:107, ig:245, cg:414, fl:281},
      {uk:'11', us:'12', eur:44, h:340, bg:250.2, bw:112, ig:251, cg:422, fl:289},
      {uk:'12', us:'13', eur:45, h:340, bg:256.6, bw:117, ig:257, cg:430, fl:297},
      {uk:'13', us:'14', eur:46, h:345, bg:263,   bw:122, ig:263, cg:438, fl:305},
    ]
  },
  {
    id: 'RAINIS_AM', name: 'RAINIS AM', type: 'mid', image: 'images/products/RAINIS_AM.jpg', hasCalf: true,
    colors: [{name:'Xanh Đậm / Kem', hex:'#2d4a2d'}],
    sizes: [
      {uk:'5',  us:'6',  eur:38, h:253, bg:212,   bw:82,  ig:215, cg:364, fl:240},
      {uk:'6',  us:'7',  eur:39, h:253, bg:218.4, bw:87,  ig:221, cg:372, fl:247},
      {uk:'7',  us:'8',  eur:40, h:258, bg:224.7, bw:92,  ig:227, cg:380, fl:255},
      {uk:'8',  us:'9',  eur:41, h:258, bg:231.1, bw:97,  ig:233, cg:388, fl:263},
      {uk:'9',  us:'10', eur:42, h:263, bg:237.4, bw:102, ig:239, cg:396, fl:273},
      {uk:'10', us:'11', eur:43, h:263, bg:243.8, bw:107, ig:245, cg:404, fl:281},
      {uk:'11', us:'12', eur:44, h:268, bg:250.2, bw:112, ig:251, cg:412, fl:289},
      {uk:'12', us:'13', eur:45, h:268, bg:256.6, bw:117, ig:257, cg:420, fl:297},
      {uk:'13', us:'14', eur:46, h:273, bg:263,   bw:122, ig:263, cg:428, fl:305},
    ]
  },
  {
    id: 'RAINIS_KH', name: 'RAINIS KH (KID)', type: 'tall', image: 'images/products/RAINIS_KH_KID.jpg', hasCalf: true,
    colors: [{name:'Hồng / Trắng', hex:'#E8836B'}],
    sizes: [
      {uk:'6',  us:'7',  eur:25, h:164, bg:166,   bw:69, ig:180, cg:264, fl:167},
      {uk:'8',  us:'9',  eur:27, h:177, bg:180,   bw:73, ig:189, cg:280, fl:177},
      {uk:'10', us:'11', eur:29, h:190, bg:188,   bw:77, ig:198, cg:296, fl:187},
      {uk:'12', us:'13', eur:31, h:205, bg:196,   bw:80, ig:207, cg:312, fl:197},
      {uk:'1K', us:'2K', eur:33, h:220, bg:209,   bw:83, ig:216, cg:328, fl:207},
      {uk:'3K', us:'4K', eur:35, h:235, bg:218.5, bw:86, ig:225, cg:344, fl:217},
    ]
  },
  {
    id: 'FOLDIS', name: 'FOLDIS', type: 'tall', image: 'images/products/FOLDIS.jpg', hasCalf: true,
    colors: [{name:'Xanh Rêu / Xám', hex:'#3d5a3e'}],
    sizes: [
      {uk:'4',  us:'5',  eur:37, h:375, bg:205.7, bw:77,  ig:209, cg:366, fl:230},
      {uk:'5',  us:'6',  eur:38, h:378, bg:212,   bw:82,  ig:215, cg:374, fl:240},
      {uk:'6',  us:'7',  eur:39, h:381, bg:218.4, bw:87,  ig:221, cg:382, fl:247},
      {uk:'7',  us:'8',  eur:40, h:384, bg:224.7, bw:92,  ig:227, cg:390, fl:255},
      {uk:'8',  us:'9',  eur:41, h:387, bg:231.1, bw:97,  ig:233, cg:398, fl:263},
      {uk:'9',  us:'10', eur:42, h:390, bg:237.4, bw:102, ig:239, cg:406, fl:273},
      {uk:'10', us:'11', eur:43, h:393, bg:243.8, bw:107, ig:245, cg:414, fl:281},
      {uk:'11', us:'12', eur:44, h:396, bg:250.2, bw:112, ig:251, cg:422, fl:289},
      {uk:'12', us:'13', eur:45, h:399, bg:256.6, bw:117, ig:257, cg:430, fl:297},
      {uk:'13', us:'14', eur:46, h:402, bg:263,   bw:122, ig:263, cg:438, fl:305},
    ]
  },
  {
    id: 'ANCHOR', name: 'ANCHOR', type: 'short', image: 'images/products/ANCHOR.jpg', hasCalf: false,
    colors: [{name:'Xanh Rêu / Xám', hex:'#2d5a2d'}],
    sizes: [
      {uk:'4',  us:'5',  eur:37, h:148, bg:222,   bw:92,  ig:225, cg:null, fl:243},
      {uk:'5',  us:'6',  eur:38, h:152, bg:226.5, bw:94,  ig:229, cg:null, fl:249.7},
      {uk:'6',  us:'7',  eur:39, h:156, bg:231,   bw:96,  ig:233, cg:null, fl:256},
      {uk:'7',  us:'8',  eur:40, h:160, bg:235.5, bw:98,  ig:237, cg:null, fl:263},
      {uk:'8',  us:'9',  eur:41, h:164, bg:240,   bw:100, ig:241, cg:null, fl:269.7},
      {uk:'9',  us:'10', eur:42, h:168, bg:244.5, bw:102, ig:245, cg:null, fl:276},
      {uk:'10', us:'11', eur:43, h:172, bg:249,   bw:104, ig:249, cg:null, fl:283},
      {uk:'11', us:'12', eur:44, h:176, bg:253.5, bw:106, ig:253, cg:null, fl:289},
      {uk:'12', us:'13', eur:45, h:180, bg:258,   bw:108, ig:257, cg:null, fl:296},
      {uk:'13', us:'14', eur:46, h:184, bg:262.5, bw:110, ig:261, cg:null, fl:303},
    ]
  },
  {
    id: 'FLEXOSLIP', name: 'FLEXOSLIP', type: 'flat', image: 'images/products/FLEXOSLIP.jpg', hasCalf: false,
    colors: [{name:'Xanh Dương', hex:'#89BCE0'}],
    sizes: [
      {uk:'2\u00bd', us:'3\u00bd', eur:35, h:68, bg:197.4, bw:88, ig:213, cg:null, fl:223.5},
      {uk:'3\u00bd', us:'4\u00bd', eur:36, h:70, bg:202,   bw:89, ig:217, cg:null, fl:230},
      {uk:'4',       us:'5',       eur:37, h:72, bg:206.5, bw:90, ig:221, cg:null, fl:236.7},
      {uk:'5',       us:'6',       eur:38, h:74, bg:211,   bw:91, ig:225, cg:null, fl:243.4},
      {uk:'5\u00bd', us:'6\u00bd', eur:39, h:76, bg:215.5, bw:92, ig:229, cg:null, fl:250},
      {uk:'6\u00bd', us:'7\u00bd', eur:40, h:78, bg:220,   bw:93, ig:233, cg:null, fl:256.7},
      {uk:'7',       us:'8',       eur:41, h:80, bg:224.5, bw:94, ig:237, cg:null, fl:263},
      {uk:'8',       us:'9',       eur:42, h:82, bg:229,   bw:95, ig:241, cg:null, fl:270},
      {uk:'9',       us:'10',      eur:43, h:84, bg:233.5, bw:96, ig:245, cg:null, fl:276.7},
      {uk:'9\u00bd', us:'10\u00bd',eur:44, h:86, bg:238,   bw:97, ig:249, cg:null, fl:283},
      {uk:'10\u00bd',us:'11\u00bd',eur:45, h:88, bg:242.5, bw:98, ig:253, cg:null, fl:290},
      {uk:'11',      us:'12',      eur:46, h:90, bg:247,   bw:99, ig:257, cg:null, fl:297},
    ]
  },
];

var GUIDE_STEPS = [
  {title:'Chiều dài bàn chân',      desc:'Đặt chân lên giấy, đứng thẳng tự nhiên, đo từ gót đến đầu ngón chân dài nhất.', image:'images/guides/foot_length.jpg'},
  {title:'Vòng khớp ngón chân',     desc:'Quấn thước dây quanh phần rộng nhất ở khớp ngón chân (qua ngón cái và ngón út).', image:'images/guides/ball_girth.jpg'},
  {title:'Bề ngang khớp ngón chân', desc:'Đánh dấu hai điểm ngoài cùng của phần rộng nhất bàn chân, đo khoảng cách thẳng.', image:'images/guides/ball_width.jpg'},
  {title:'Vòng mu bàn chân',        desc:'Xác định phần mu chân cao nhất, thường cách vòng khớp ngón 25mm, đo vòng quanh.', image:'images/guides/instep_girth.jpg'},
  {title:'Vòng bắp chân',           desc:'Đứng thẳng tự nhiên, đo vòng quanh phần lớn nhất của bắp chân.', image:'images/guides/calf_girth.jpg'},
];
