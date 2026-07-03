/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Chapter, TimelineEvent, MapNode, PrisonHotspot } from "../types";

export const CHAPTERS: Chapter[] = [
  {
    id: "chapter-1",
    number: 1,
    title: {
      hi: "दिल्ली में मौत का जाल",
      en: "The Death Trap in Delhi",
    },
    subtitle: {
      hi: "26 अगस्त 1978: एक घातक लिफ्ट",
      en: "August 26, 1978: A Fatal Lift",
    },
    bgType: "map",
    bgValue: "delhi",
    sections: [
      {
        id: "s1-1",
        text: {
          hi: "1978 की एक गर्म अगस्त शाम को, किशोर भाई-बहन गीता चोपड़ा (16) और संजय चोपड़ा (14) नई दिल्ली में अपने घर से निकलते हैं। गीता, जो ऑल इंडिया रेडियो की एक उभरती हुई प्रस्तोता हैं, अपने भाई के साथ एक युवा कार्यक्रम रिकॉर्ड करने जा रही हैं।",
          en: "On a warm August evening in 1978, teenage siblings Geeta Chopra (16) and Sanjay Chopra (14) leave their home in New Delhi. Geeta, a budding All India Radio presenter, is headed to record a youth program with her brother.",
        },
        highlight: {
          hi: "धौला कुआँ के पास लिफ्ट मांगते हुए, वे एक त्वरित लिफ्ट की तलाश करते हैं, जो मंडराते हुए खतरे से पूरी तरह अनजान हैं।",
          en: "Hitchhiking near Dhaula Kuan, they seek a quick lift, completely unaware of the lurking danger.",
        },
        coordinates: { lat: 28.5921, lng: 77.1685, label: "Dhaula Kuan, New Delhi" },
      },
      {
        id: "s1-2",
        text: {
          hi: "एक चोरी की फिएट 1100 आकर रुकती है। स्टीयरिंग व्हील के पीछे अनुभवी, शातिर अपराधी कुलजीत सिंह (रंगा) और जसबीर सिंह (बिल्ला) हैं। वे भाई-बहन को लिफ्ट की पेशकश करते हैं। लेकिन यह कार एक घूमती हुई जेल है—बिल्ला ने पिछले दरवाजे के सभी अंदरूनी हैंडल हटा दिए हैं।",
          en: "A stolen Fiat 1100 pulls up. Behind the wheel are seasoned, hardened criminals Kuljeet Singh (Ranga) and Jasbir Singh (Billa). They offer the siblings a lift. But this car is a rolling prison—Billa has removed all interior rear door handles.",
        },
        highlight: {
          hi: "जैसे ही दरवाजे बंद हुए, पिछली सीट एक न बच सकने वाले, दमघोंटू पिंजरे में बदल गई।",
          en: "Once the doors shut, the back seat became an inescapable, claustrophobic cage.",
        },
        coordinates: { lat: 28.5921, lng: 77.1685, label: "Dhaula Kuan, New Delhi" },
      },
      {
        id: "s1-3",
        text: {
          hi: "अपहरणकर्ताओं का एक सरल लक्ष्य है: भारी फिरौती के लिए अमीर बच्चों का अपहरण करना। जब वे उनसे पूछताछ शुरू करते हैं, तो संजय गर्व से उल्लेख करता है कि उनके पिता, मदन मोहन चोपड़ा, भारतीय नौसेना में एक वरिष्ठ कमांडर हैं।",
          en: "The abductors have a simple goal: kidnap wealthy children for a massive payout. As they begin questioning them, Sanjay proudly mentions that their father, Madan Mohan Chopra, is a senior Commander in the Indian Navy.",
        },
        highlight: {
          hi: "रंगा और बिल्ला को गलतफहमी है कि नौसेना अधिकारियों के पास भारी संपत्ति या नकद पैसा नहीं होता।",
          en: "Ranga and Billa mistakenly believe that naval officers do not possess massive fortunes or liquid cash.",
        },
        coordinates: { lat: 28.5921, lng: 77.1685, label: "Dhaula Kuan, New Delhi" },
      },
    ],
  },
  {
    id: "chapter-2",
    number: 2,
    title: {
      hi: "रिज फॉरेस्ट में हड़कंप",
      en: "Panic in the Ridge Forest",
    },
    subtitle: {
      hi: "विफल साजिश से क्रूर त्रासदी तक",
      en: "From Failed Plot to Brutal Tragedy",
    },
    bgType: "satellite",
    bgValue: "ridge-forest",
    sections: [
      {
        id: "s2-1",
        text: {
          hi: "यह महसूस करने पर कि उन्हें भारी फिरौती नहीं मिलेगी, फिएट के अंदर हड़कंप मच जाता है। पकड़े जाने के डर से, रंगा और बिल्ला एक क्रूर निर्णय लेते हैं: उन्हें अपने निशान मिटाने के लिए बच्चों को खत्म करना होगा।",
          en: "Upon realizing they would not get the massive ransom, panic sets in inside the Fiat. Terrified of being captured, Ranga and Billa make a cold-blooded decision: they must eliminate the children to cover their tracks.",
        },
        highlight: {
          hi: "घबराहट और हताशा ने तुरंत अपहरण को एक क्रूर हत्या की योजना में बदल दिया।",
          en: "Panic and desperation instantly mutated the abduction into a cold-blooded plan of execution.",
        },
        coordinates: { lat: 28.6255, lng: 77.1950, label: "Ridge Forest, Delhi" },
      },
      {
        id: "s2-2",
        text: {
          hi: "लेकिन भाई-बहन बिना लड़े हार नहीं मानते। वे तंग केबिन के भीतर अपने अपहरणकर्ताओं के खिलाफ एक साहसिक, हताश संघर्ष लड़ते हैं। संजय अपनी बहन को खूंखार अपराधियों से बचाने के लिए अपनी पूरी ताकत लगा देता है।",
          en: "But the siblings do not surrender without a fight. They wage a heroic, desperate struggle against their captors inside the cramped cabin. Sanjay tries with everything he has to shield his sister from the hardened criminals.",
        },
        highlight: {
          hi: "क्रूर हिंसा का सामना करने पर भी, इन युवा भाई-बहनों ने बेमिसाल साहस के साथ मुकाबला किया।",
          en: "Even in the face of brutal violence, the young siblings fought back with legendary courage.",
        },
      },
      {
        id: "s2-3",
        text: {
          hi: "वे फिएट को दिल्ली के घने, सुनसान रिज फॉरेस्ट इलाके में ले जाते हैं। वहाँ, गीता और संजय की बेरहमी से चाकू मारकर हत्या कर दी जाती है और उन्हें छोड़ दिया जाता है। जब दो दिन बाद एक राहगीर को उनके शव मिलते हैं, तो इससे पूरे देश में शोक की लहर दौड़ जाती है और पूरे भारत में सदमा पहुँचता है।",
          en: "They drive the Fiat deep into the dense, secluded Ridge Forest area of Delhi. There, Geeta and Sanjay are brutally stabbed to death and abandoned. When their bodies are found two days later by a passerby, it triggers nationwide grief and shockwaves across India.",
        },
        highlight: {
          hi: "इस त्रासदी ने भारतीय संसद को झकझोर कर रख दिया और पुलिस पर अत्यधिक, ऐतिहासिक दबाव डाला।",
          en: "The tragedy shook the Indian Parliament and placed immense, historic pressure on the police.",
        },
        coordinates: { lat: 28.6255, lng: 77.1950, label: "Ridge Forest, Delhi" },
      },
    ],
  },
  {
    id: "chapter-3",
    number: 3,
    title: {
      hi: "मौत की कार: फोरेंसिक ब्लूप्रिंट",
      en: "The Death Car: Forensic Blueprint",
    },
    subtitle: {
      hi: "बिल्ला की बदनाम फिएट 1100 के भीतर",
      en: "Inside Billa's Infamous Fiat 1100",
    },
    bgType: "prison",
    bgValue: "fiat-car",
    sections: [
      {
        id: "s3-1",
        text: {
          hi: "रंगा और बिल्ला को दोषी ठहराने की कुंजी चोरी की फिएट 1100 के अंदर छिपी थी जिसे उन्होंने चलती-फिरती मौत के जाल के रूप में इस्तेमाल किया था। फोरेंसिक जांचकर्ताओं ने केबिन के एक-एक मिलीमीटर की तलाशी ली और महत्वपूर्ण फोरेंसिक सबूत सुरक्षित किए।",
          en: "The key to convicting Ranga and Billa lay hidden inside the stolen Fiat 1100 they used as a rolling death trap. Forensic investigators searched the cabin millimeter by millimeter, securing critical forensic evidence.",
        },
        highlight: {
          hi: "बालों के रेशे, उंगलियों के निशान और खून के सूक्ष्म धब्बे अभियोजन पक्ष के मामले की रीढ़ बने।",
          en: "Hair fibers, fingerprints, and micro-bloodstains formed the backbone of the prosecution's case.",
        },
      },
      {
        id: "s3-2",
        text: {
          hi: "तकनीशियनों ने सीट के कुशन पर संजय के बालों के प्रकार से मेल खाते सूक्ष्म बालों के रेशे खोजे। सबसे महत्वपूर्ण बात यह थी कि पिछली सीट पर मिले खून के बड़े धब्बे गीता और संजय के दुर्लभ रक्त समूहों से मेल खाते थे।",
          en: "Technicians discovered microscopic hair fibers on the seat cushions matching Sanjay's hair type. Crucially, the extensive bloodstains found on the back seat matched the rare blood groups of Geeta and Sanjay.",
        },
        highlight: {
          hi: "बिल्ला द्वारा अंदरूनी दरवाजों के हैंडल को हटाना ठंडे दिमाग से की गई सोची-समझी साजिश को साबित करता है।",
          en: "Billa's removal of the interior door handles proved cold, calculated intent.",
        },
      },
    ],
  },
  {
    id: "chapter-4",
    number: 4,
    title: {
      hi: "तलाश और गिरफ्तारी",
      en: "The Hunt and Capture",
    },
    subtitle: {
      hi: "भारतीय रेल पर सतर्कता",
      en: "Vigilance on the Indian Rails",
    },
    bgType: "image",
    bgValue: "arrest",
    sections: [
      {
        id: "s4-1",
        text: {
          hi: "रंगा और बिल्ला की तलाश आधुनिक भारतीय इतिहास की सबसे बड़ी तलाश थी। अपराधियों के चेहरों को दिखाने वाले वांछित पोस्टर देश के हर रेलवे स्टेशन, बस डिपो और सार्वजनिक चौराहे पर चिपकाए गए थे।",
          en: "The manhunt for Ranga and Billa was the largest in modern Indian history. Wanted posters showing the criminals' faces were pasted across every railway station, bus depot, and public square in the country.",
        },
        highlight: {
          hi: "भारत के दो सबसे वांछित भगोड़ों के लिए छिपने की कोई जगह नहीं बची थी।",
          en: "There was no place left to hide for the two most wanted fugitives in India.",
        },
      },
      {
        id: "s4-2",
        text: {
          hi: "सितंबर 1978 में, भगोड़ों ने ट्रेन से भागने की कोशिश की। यात्री डिब्बे में सवार, सतर्क सह-यात्रियों और सैन्य कर्मियों ने उन्हें पोस्टरों से पहचान लिया। उन्होंने अलार्म बजाया और अपराधियों को फर्श पर दबोच लिया।",
          en: "In September 1978, the fugitives attempt to escape by train. Aboard the passenger carriage, alert co-passengers and military personnel recognize them from posters. They sound the alarm and pin the criminals down on the floor.",
        },
        highlight: {
          hi: "हत्यारों को साफ बच निकलने से पहले सीधे रेल की पटरियों पर ही पकड़ लिया गया।",
          en: "The killers were apprehended directly on the rails before they could make a clean getaway.",
        },
      },
      {
        id: "s4-3",
        text: {
          hi: "इस मुकदमे ने पूरे देश को अपनी ओर आकर्षित किया और झकझोर दिया। अकाट्य उंगलियों के निशान, खून के धब्बे और बैलिस्टिक सबूतों से लैस, अदालत ने दोनों को मौत की सजा सुनाई। उन्हें 1982 में तिहाड़ जेल में एक साथ फांसी दे दी गई।",
          en: "The trial captivated and shocked the entire nation. Armed with undeniable fingerprint, blood stain, and ballistic evidence, the court awarded both the death penalty. They were hanged together in Tihar Jail in 1982.",
        },
        highlight: {
          hi: "1982 में उनकी संयुक्त फांसी ने भारतीय आपराधिक इतिहास के सबसे काले अध्यायों में से एक को बंद कर दिया।",
          en: "Their joint execution in 1982 closed one of the darkest chapters in Indian criminal history.",
        },
      },
    ],
  },
  {
    id: "chapter-5",
    number: 5,
    title: {
      hi: "विरासत और प्राइम की 'राख' सीरीज",
      en: "The Legacy & Prime's 'Raakh'",
    },
    subtitle: {
      hi: "एक डर जिसने पूरी पीढ़ी को बदल दिया",
      en: "A Fear That Transformed a Generation",
    },
    bgType: "map",
    bgValue: "mumbai",
    sections: [
      {
        id: "s5-1",
        text: {
          hi: "इस त्रासदी ने मौलिक रूप से बदल दिया कि भारतीय परिवार बच्चों की सुरक्षा, लिफ्ट मांगने और बाहरी स्वतंत्रता को कैसे देखते थे। प्रसिद्ध अभिनेता बॉबी देओल ने याद किया कि कैसे इस मामले ने उनके बचपन को गहराई से झकझोर दिया था, क्योंकि हर जगह माता-पिता ने अचानक बच्चों के बाहर खेलने पर प्रतिबंध लगा दिया था।",
          en: "The tragedy fundamentally transformed how Indian families viewed child safety, hitchhiking, and outdoor freedom. Celebrated actor Bobby Deol recounted how the case deeply traumatized his childhood, as parents everywhere suddenly restricted children from playing outside.",
        },
        highlight: {
          hi: "डर भारतीय घरों में समा गया, जिससे बच्चों की आज़ादी के इर्द-गिर्द सख्त सीमाएँ खिंच गईं।",
          en: "Fear seeped into Indian households, drawing strict lines around children's freedom.",
        },
        coordinates: { lat: 18.9750, lng: 72.8258, label: "Mumbai, Maharashtra" },
      },
      {
        id: "s5-2",
        text: {
          hi: "अमेज़न प्राइम वीडियो की सीरीज़ 'राख' सीधे तौर पर इसी रोंगटे खड़े कर देने वाले अपहरण और हत्याकांड से प्रेरित है। यह दर्शाती है कि अपराध के बाद कैसे एक देश की मासूमियत राख में बदल गई, और गहन जांच के बाद की स्थिति की पड़ताल करती है।",
          en: "The Amazon Prime Video series 'Raakh' is directly inspired by this spine-chilling kidnapping and murder case. It depicts how a nation's innocence turned to ashes in the wake of the crime, and explores the intense investigative aftermath.",
        },
        highlight: {
          hi: "सीरीज़ 'राख' पुरानी फोरेंसिक फाइलों और साहस के एक शानदार प्रदर्शन में नई जान फूंकती है।",
          en: "The series 'Raakh' breathes new life into cold forensic files and a legendary display of courage.",
        },
      },
      {
        id: "s5-3",
        text: {
          hi: "भाई-बहनों की अविश्वसनीय बहादुरी का सम्मान करने के लिए, भारत सरकार ने राष्ट्रीय वीरता पुरस्कारों के हिस्से के रूप में वार्षिक 'गीता चोपड़ा पुरस्कार' और 'संजय चोपड़ा पुरस्कार' की स्थापना की, जो असाधारण साहस प्रदर्शित करने वाले बच्चों को दिया जाता है।",
          en: "To honor the incredible bravery of the siblings, the Government of India instituted the annual 'Geeta Chopra Award' and 'Sanjay Chopra Award' as part of the National Bravery Awards, awarded to children exhibiting extraordinary courage.",
        },
        highlight: {
          hi: "उनके नाम हमेशा वीरता और प्रतिरोध के सर्वोच्च प्रतीकों के रूप में खड़े रहेंगे।",
          en: "Their names will forever stand as the ultimate symbols of bravery and resistance.",
        },
      },
    ],
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1978",
    date: { hi: "26 अगस्त 1978", en: "August 26, 1978" },
    title: { hi: "दिल्ली में अपहरण", en: "The Abduction in Delhi" },
    description: {
      hi: "गीता और संजय चोपड़ा को धौला कुआँ के पास एक चोरी की फिएट 1100 में लिफ्ट की पेशकश की गई, जो एक घातक जाल साबित हुई।",
      en: "Geeta and Sanjay Chopra are offered a lift in a stolen Fiat 1100 near Dhaula Kuan, which turned out to be a fatal trap.",
    },
    location: { hi: "नई दिल्ली, भारत", en: "New Delhi, India" },
  },
  {
    year: "1978",
    date: { hi: "28 अगस्त 1978", en: "August 28, 1978" },
    title: { hi: "रिज में शवों की खोज", en: "Discovery in the Ridge" },
    description: {
      hi: "एक राहगीर ने घने रिज फॉरेस्ट में भाई-बहन के शवों की खोज की, जिन पर बचाव के दौरान लगे कई घाव थे।",
      en: "A passerby discovers the siblings' bodies, bearing multiple defensive stab wounds, in the dense Ridge Forest.",
    },
    location: { hi: "रिज फॉरेस्ट, दिल्ली", en: "Ridge Forest, Delhi" },
  },
  {
    year: "1978",
    date: { hi: "सितंबर 1978", en: "September 1978" },
    title: { hi: "रेल की पटरियों पर काबू पाना", en: "Overpowered on the Rails" },
    description: {
      hi: "सतर्क ट्रेन यात्रियों और सैन्य कर्मियों ने रंगा और बिल्ला को एक यात्री ट्रेन में देखा, उन्हें दबोच लिया और गिरफ्तार कर लिया।",
      en: "Alert train passengers and military personnel spot Ranga and Billa on a passenger train, tackling and arresting them.",
    },
    location: { hi: "भारतीय रेलवे", en: "Indian Railways" },
  },
  {
    year: "1979",
    date: { hi: "न्यायिक मुकदमा", en: "The Judicial Trial" },
    title: { hi: "फोरेंसिक ने केस साबित किया", en: "Forensics Seal the Case" },
    description: {
      hi: "चोरी की फिएट में मिले उंगलियों के निशान, बालों के नमूने और मेल खाते रक्त समूहों ने त्वरित दोषसिद्धि सुनिश्चित की।",
      en: "Fingerprints, hair samples, and matching blood types found in the stolen Fiat secure a fast-track conviction.",
    },
    location: { hi: "दिल्ली उच्च न्यायालय", en: "Delhi High Court" },
  },
  {
    year: "1982",
    date: { hi: "27 अप्रैल 1982", en: "April 27, 1982" },
    title: { hi: "फांसी", en: "The Execution" },
    description: {
      hi: "कुलजीत सिंह (रंगा) और जसबीर सिंह (बिल्ला) को उनकी असाधारण क्रूरता के लिए तिहाड़ जेल में एक साथ फांसी दी गई।",
      en: "Kuljeet Singh (Ranga) and Jasbir Singh (Billa) are hanged together in Tihar Jail for their exceptional cruelty.",
    },
    location: { hi: "तिहाड़ जेल, नई दिल्ली", en: "Tihar Jail, New Delhi" },
  },
];

export const MAP_NODES: MapNode[] = [
  {
    id: "node-mumbai",
    name: { hi: "मुंबई (उत्पत्ति)", en: "Mumbai (Origins)" },
    lat: 18.9750,
    lng: 72.8258,
    description: {
      hi: "जहाँ रंगा और बिल्ला ने शुरू में अपने अपराध गिरोह का संचालन किया था, इससे पहले कि वे त्वरित नकदी सुरक्षित करने के लिए दिल्ली भाग गए।",
      en: "Where Ranga and Billa originally operated their crime ring before fleeing to Delhi to secure quick cash.",
    },
  },
  {
    id: "node-delhi",
    name: { hi: "धौला कुआँ (अपहरण)", en: "Dhaula Kuan (Kidnap)" },
    lat: 28.5921,
    lng: 77.1685,
    description: {
      hi: "वह घातक दिल्ली चौराहा जहाँ गीता और संजय को चोरी की फिएट 1100 में बहलाया गया था।",
      en: "The fateful Delhi intersection where Geeta and Sanjay were lured into the stolen Fiat 1100.",
    },
  },
  {
    id: "node-ridge",
    name: { hi: "रिज फॉरेस्ट (अपराध स्थल)", en: "Ridge Forest (Crime Scene)" },
    lat: 28.6255,
    lng: 77.1950,
    description: {
      hi: "वह घना और सुनसान वन क्षेत्र जहाँ भाई-बहनों ने मुकाबला किया और उनकी दुखद हत्या कर दी गई।",
      en: "The dense and secluded forest area where the siblings fought back and were tragically murdered.",
    },
  },
  {
    id: "node-railway",
    name: { hi: "रेलवे ट्रैक (गिरफ्तारी)", en: "Railway Track (Arrest)" },
    lat: 26.8467,
    lng: 80.9462,
    description: {
      hi: "भगोड़ों ने ट्रेन से भागने की कोशिश की, लेकिन सतर्क ट्रेन यात्रियों ने उन्हें पहचान लिया और उन्हें दबोच लिया।",
      en: "The fugitives attempted to flee by train, but were pinned down by alert train passengers who recognized them.",
    },
  },
  {
    id: "node-tihar",
    name: { hi: "तिहाड़ जेल (फांसी)", en: "Tihar Jail (Execution)" },
    lat: 28.6190,
    lng: 77.1001,
    description: {
      hi: "दिल्ली की वह उच्च सुरक्षा वाली जेल जहाँ मुकदमा चला और जहाँ अपराधियों को फांसी दी गई।",
      en: "The high-security prison in Delhi where the trial took place and where the perpetrators were executed.",
    },
  },
];

export const PRISON_HOTSPOTS: PrisonHotspot[] = [
  {
    id: "handles",
    title: { hi: "हटाए गए आंतरिक हैंडल", en: "Removed Interior Handles" },
    description: {
      hi: "बिल्ला ने बदनाम तरीके से अपनी चोरी की फिएट 1100 के पिछले दरवाजे के आंतरिक हैंडल और खिड़की के क्रैंक हटा दिए थे। एक बार अंदर जाने के बाद, पिछली सीट एक न बच पाने वाले पिंजरे में बदल गई जहाँ से भागना असंभव था।",
      en: "Billa notoriously removed the interior rear door handles and window cranks of his stolen Fiat 1100. Once inside, the back seat became an inescapable, soundproof cage from which escape was impossible.",
    },
    coordinates: { x: 50, y: 30 },
  },
  {
    id: "rear-seat",
    title: { hi: "पिछली सीट पर संघर्ष", en: "Struggle on the Rear Seat" },
    description: {
      hi: "पिछली सीट के कपड़े के फोरेंसिक विश्लेषण से गीता और संजय के दुर्लभ रक्त समूहों से मेल खाने वाले खून के भारी धब्बे मिले, जो उनके हत्यारों के खिलाफ उनके द्वारा किए गए उग्र, वीरतापूर्ण शारीरिक संघर्ष को दर्शाते हैं।",
      en: "Forensic analysis of the back seat's fabric revealed massive bloodstains matching the rare blood types of Geeta and Sanjay, documenting the fierce, heroic physical struggle they mounted against their killers.",
    },
    coordinates: { x: 25, y: 60 },
  },
  {
    id: "fibers",
    title: { hi: "बालों और कपड़ों के रेशे", en: "Hair & Clothing Fibers" },
    description: {
      hi: "फोरेंसिक वैज्ञानिकों ने सीट कुशन से सूक्ष्म फाइबर बरामद किए जो संजय के बालों के प्रकार और कपड़ों से पूरी तरह मेल खाते थे, जिससे भौतिक उपस्थिति स्थापित हुई और पीड़ितों का संबंध सीधे बिल्ला की कार से जुड़ गया।",
      en: "Forensic scientists recovered micro-fibers from the seat cushioning that perfectly matched Sanjay's hair type and clothing, establishing physical occupancy and linking the victims directly to Billa's car.",
    },
    coordinates: { x: 75, y: 70 },
  },
  {
    id: "steering-wheel",
    title: { hi: "स्टीयरिंग व्हील के निशान", en: "Steering Wheel Prints" },
    description: {
      hi: "स्टीयरिंग व्हील और दरवाजे के फ्रेम से लिए गए उंगलियों के निशान मुंबई पुलिस की फाइलों में दर्ज जसबीर सिंह (बिल्ला) के आपराधिक रिकॉर्ड से पूरी तरह मेल खाते थे, जिससे उनके बहाने नष्ट हो गए।",
      en: "Fingerprints lifted from the steering wheel and door frames perfectly matched the criminal records of Jasbir Singh (Billa) stored in the Mumbai police files, destroying their alibis.",
    },
    coordinates: { x: 15, y: 20 },
  },
];
