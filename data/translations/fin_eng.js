const fin_eng = [
    {
        TOPIC:"Perusteet",
        SUBTOPICS: ["Persoonapronominit", "Numerot"],
        DESCRIPTION:"blah",
        SUBTOPICDATA: [
            {
                SUBTOPIC:"Persoonapronominit",
                DESCRIPTION:"Opi ensimmäiset persoonapronominit",
                IMAGE: require("./../images/subtopic_icon_people.png")
            },
            {
                SUBTOPIC:"Numerot",
                DESCRIPTION:"Opi tärkeimmät numerot",
                IMAGE: require("./../images/subtopic_icon_numbers.png")
            }
        ],
        COURSEDATA: [
            {
                ID: 1,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "minä",
                FOREIGNWORD: "I",
                SENTENCE: "Hei! Minä olen Pietari",
                FOREIGNSENTENCE: "Hi! I am Pietari",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/osoittaa_itsea.png")
            },
            {
                ID: 2,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "sinä",
                FOREIGNWORD: "you",
                SENTENCE: "Kuka sinä olet?",
                FOREIGNSENTENCE: "Who are you?",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/ikoni_sormi_osoittaa.png")
            },
            {
                ID: 3,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "hän (miehestä)",
                FOREIGNWORD: "he",
                SENTENCE: "Kuka hän (miespuolinen) on?",
                FOREIGNSENTENCE: "Who is he?",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/ikoni_mies.png")
            },
            {
                ID: 4,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "hän (naisesta)",
                FOREIGNWORD: "she",
                SENTENCE: "Kuka hän (naispuolinen) on?",
                FOREIGNSENTENCE: "Who is she?",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/ikoni_nainen.png")
            },
            {
                ID: 5,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "me",
                FOREIGNWORD: "we",
                SENTENCE: "Me olemme veljeksiä",
                FOREIGNSENTENCE: "We are brothers",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/ikoni_me.png")
            },
            {
                ID: 6,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "te",
                FOREIGNWORD: "you",
                SENTENCE: "Te olette todella mukavia",
                FOREIGNSENTENCE: "You are very nice",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/noimage.png")
            },
            {
                ID: 7,
                TOPIC:"Perusteet",
                SUBTOPIC:"Persoonapronominit",
                WORD: "he",
                FOREIGNWORD: "they",
                SENTENCE: "He ovat hauskoja",
                FOREIGNSENTENCE: "They are funny",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/noimage.png")
            },
            {
                ID: 8,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "yksi",
                FOREIGNWORD: "one",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_1.png")
            },
            {
                ID: 9,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "kaksi",
                FOREIGNWORD: "two",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_2.png")
            },
            {
                ID: 10,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "kolme",
                FOREIGNWORD: "three",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_3.png")
            },
            {
                ID: 11,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "neljä",
                FOREIGNWORD: "four",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_4.png")
            },
            {
                ID: 12,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "viisi",
                FOREIGNWORD: "five",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_5.png")
            },
            {
                ID: 13,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "kuusi",
                FOREIGNWORD: "six",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_6.png")
            },
            {
                ID: 14,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "seitsemän",
                FOREIGNWORD: "seven",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_7.png")
            },
            {
                ID: 15,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "kahdeksan",
                FOREIGNWORD: "eight",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_8.png")
            },
            {
                ID: 16,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "yhdeksän",
                FOREIGNWORD: "nine",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_9.png")
            },
            {
                ID: 17,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "kymmenen",
                FOREIGNWORD: "ten",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_10.png")
            },
            {
                ID: 18,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "sata",
                FOREIGNWORD: "hundred",
                SENTENCE: "",
                FOREIGNSENTENCE: "",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/numerot_100.png")
            },
            {
                ID: 19,
                TOPIC:"Perusteet",
                SUBTOPIC:"Numerot",
                WORD: "tuhat",
                FOREIGNWORD: "thousand",
                SENTENCE: "Tietokone maksoi tuhat euroa",
                FOREIGNSENTENCE: "The computer cost a thousand euros",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/noimage.png")
            }
        ]
    },
    {
        TOPIC:"Eläimet",
        SUBTOPICS: ["Villieläimet", "Kotieläimet"],
        DESCRIPTION:"blah",
        SUBTOPICDATA: [
            {
                SUBTOPIC:"Villieläimet",
                DESCRIPTION:"Opi villieläinten nimiä",
                IMAGE: require("./../images/subtopic_icon_wild_animals.png")
            },
            {
                SUBTOPIC:"Kotieläimet",
                DESCRIPTION:"Opi kotieläinten nimiä",
                IMAGE: require("./../images/subtopic_icon_domestic_animals.png")
            }
        ],
        COURSEDATA: [
            {
                ID: 20,
                TOPIC:"Eläimet",
                SUBTOPIC:"Villieläimet",
                WORD: "karhu",
                FOREIGNWORD: "bear",
                SENTENCE: "Karhu on iso eläin",
                FOREIGNSENTENCE: "The bear is a big animal",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_bear.png")
            },
            {
                ID: 21,
                TOPIC:"Eläimet",
                SUBTOPIC:"Villieläimet",
                WORD: "susi",
                FOREIGNWORD: "wolf",
                SENTENCE: "Susi on saalistaja",
                FOREIGNSENTENCE: "Wolf is a predator",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_wolf.png")
            },
            {
                ID: 22,
                TOPIC:"Eläimet",
                SUBTOPIC:"Villieläimet",
                WORD: "leijona",
                FOREIGNWORD: "lion",
                SENTENCE: "Leijona on savannin kuningas",
                FOREIGNSENTENCE: "The lion is the king of savannah",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_lion.png")
            },
            {
                ID: 23,
                TOPIC:"Eläimet",
                SUBTOPIC:"Villieläimet",
                WORD: "hirvi",
                FOREIGNWORD: "moose",
                SENTENCE: "Hirvi on iso eläin",
                FOREIGNSENTENCE: "The moose is a big animal",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_moose.png")
            },
            {
                ID: 24,
                TOPIC:"Eläimet",
                SUBTOPIC:"Kotieläimet",
                WORD: "koira",
                FOREIGNWORD: "dog",
                SENTENCE: "Koira on ihmisen paras ystävä",
                FOREIGNSENTENCE: "A dog is man's best friend",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_dog.png")
            },
            {
                ID: 25,
                TOPIC:"Eläimet",
                SUBTOPIC:"Kotieläimet",
                WORD: "kissa",
                FOREIGNWORD: "cat",
                SENTENCE: "Kissat ovat viekkaita eläimiä",
                FOREIGNSENTENCE: "Cats are cunning animals",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_cat.png")
            },
            {
                ID: 26,
                TOPIC:"Eläimet",
                SUBTOPIC:"Kotieläimet",
                WORD: "hevonen",
                FOREIGNWORD: "horse",
                SENTENCE: "Hevonen on työeläin",
                FOREIGNSENTENCE: "A horse is a working animal",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_horse.png")
            },
            {
                ID: 27,
                TOPIC:"Eläimet",
                SUBTOPIC:"Kotieläimet",
                WORD: "lammas",
                FOREIGNWORD: "sheep",
                SENTENCE: "Lampaat tuottavat villaa",
                FOREIGNSENTENCE: "Sheep produce wool",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/animal_sheep.png")
            }
        ]
    },
    {
        TOPIC:"Ruoka",
        SUBTOPICS: ["Ruoka-ainekset", "Ateria-ajat"],
        DESCRIPTION:"blah",
        SUBTOPICDATA: [
            {
                SUBTOPIC:"Ruoka-ainekset",
                DESCRIPTION:"Opi ruokien nimiä",
                IMAGE: require("./../images/animal_bear.png")
            },
            {
                SUBTOPIC:"Ateria-ajat",
                DESCRIPTION:"Opi tärkeimmät ateria-ajat",
                IMAGE: require("./../images/animal_bear.png")
            }
        ],
        COURSEDATA: [
            {
                ID: 28,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ruoka-ainekset",
                WORD: "peruna",
                FOREIGNWORD: "potato",
                SENTENCE: "Peruna on perusruoka",
                FOREIGNSENTENCE: "Potato is a staple food",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_potato.png")
            },
            {
                ID: 29,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ruoka-ainekset",
                WORD: "riisi",
                FOREIGNWORD: "rice",
                SENTENCE: "Riisin voi keittää vedessä",
                FOREIGNSENTENCE: "Rice can be cooked in water",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_rice.png")
            },
            {
                ID: 30,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ruoka-ainekset",
                WORD: "vihannes",
                FOREIGNWORD: "vegetable",
                SENTENCE: "Vihannekset ovat terveellisiä",
                FOREIGNSENTENCE: "Vegetables are healthy",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_vegetable.png")
            },
            {
                ID: 31,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ruoka-ainekset",
                WORD: "liha",
                FOREIGNWORD: "meat",
                SENTENCE: "Lihassa on proteiineja",
                FOREIGNSENTENCE: "There are proteins in meat",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_meat.png")
            },
            {
                ID: 32,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ateria-ajat",
                WORD: "aamupala",
                FOREIGNWORD: "brekfast",
                SENTENCE: "Aamupala on päivän ensimmäinen ateria",
                FOREIGNSENTENCE: "Breakfast is the first meal of the day",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_breakfast.png")
            },
            {
                ID: 33,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ateria-ajat",
                WORD: "lounas",
                FOREIGNWORD: "lunch",
                SENTENCE: "Lounas syödään keskipäivällä",
                FOREIGNSENTENCE: "Lunch is eaten at noon",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_lunch.png")
            },
            {
                ID: 34,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ateria-ajat",
                WORD: "päivällinen",
                FOREIGNWORD: "dinner",
                SENTENCE: "Päivällinen syödään alkuillasta",
                FOREIGNSENTENCE: "Dinner is eaten in the early evening",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_dinner.png")
            },
            {
                ID: 35,
                TOPIC:"Ruoka",
                SUBTOPIC:"Ateria-ajat",
                WORD: "iltapala",
                FOREIGNWORD: "evening snack",
                SENTENCE: "Iltapalan voi syödä ennen nukkumaanmenoa",
                FOREIGNSENTENCE: "You can have an evening snack before going to bed",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/food_eveningsnack.png")
            }
        ]
    },
    {
        TOPIC:"Ympäristö",
        SUBTOPICS: ["Avaruus", "Luonto", "Kaupunki"],
        DESCRIPTION:"blah",
        SUBTOPICDATA: [
            {
                SUBTOPIC:"Avaruus",
                DESCRIPTION:"Opi avaruuden käsitteitä",
                IMAGE: require("./../images/subtopic_icon_space.png")
            },
            {
                SUBTOPIC:"Luonto",
                DESCRIPTION:"Opi luonnon käsitteitä",
                IMAGE: require("./../images/subtopic_icon_nature.png")
            },
            {
                SUBTOPIC:"Kaupunki",
                DESCRIPTION:"Opi keupunkielämän käsitteitä",
                IMAGE: require("./../images/subtopic_icon_city.png")
            }
        ],
        COURSEDATA: [
            {
                ID: 36,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Avaruus",
                WORD: "aurinko",
                FOREIGNWORD: "sun",
                SENTENCE: "Aurinko lämmittää maapalloa",
                FOREIGNSENTENCE: "The sun warms the earth",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_sun.png")
            },
            {
                ID: 37,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Avaruus",
                WORD: "kuu",
                FOREIGNWORD: "moon",
                SENTENCE: "Kuu antaa valoa yöllä",
                FOREIGNSENTENCE: "The moon gives light at night",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_moon.png")
            },
            {
                ID: 38,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Avaruus",
                WORD: "planeetta",
                FOREIGNWORD: "planet",
                SENTENCE: "Saturnus on planeetta",
                FOREIGNSENTENCE: "Saturn is a planet",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_planet.png")
            },
            {
                ID: 39,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Avaruus",
                WORD: "maa",
                FOREIGNWORD: "Earth",
                SENTENCE: "Meidän planeettaamme kutsutaan maaksi",
                FOREIGNSENTENCE: "Our planet is called the Earth",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_earth.png")
            },
            {
                ID: 40,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Avaruus",
                WORD: "tähti",
                FOREIGNWORD: "star",
                SENTENCE: "Pimeällä taivaalla voi nähdä paljon tähtiä",
                FOREIGNSENTENCE: "You can see a lot of stars in a dark sky",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_star.png")
            },
            {
                ID: 41,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Luonto",
                WORD: "puu",
                FOREIGNWORD: "tree",
                SENTENCE: "Puu on hyvä rakennusmateriaali",
                FOREIGNSENTENCE: "Wood is a great building material",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/nature_tree.png")
            },
            {
                ID: 42,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Luonto",
                WORD: "meri",
                FOREIGNWORD: "ocean",
                SENTENCE: "Meret peittävät suurimman osan maapallon pinta-alasta",
                FOREIGNSENTENCE: "Oceans cover most of the Earth's surface",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/nature_ocean.png")
            },
            {
                ID: 43,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Luonto",
                WORD: "vuori",
                FOREIGNWORD: "mountain",
                SENTENCE: "Mount Everest on maapallon suurin vuori",
                FOREIGNSENTENCE: "Mount Everest is the largest mountain on Earth",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/nature_mountain.png")
            },
            {
                ID: 44,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Luonto",
                WORD: "tuuli",
                FOREIGNWORD: "wind",
                SENTENCE: "Tuuli on uusiutuva luonnonvara",
                FOREIGNSENTENCE: "Wind is a renewable natural resource",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/nature_wind.png")
            },
            {
                ID: 45,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Kaupunki",
                WORD: "kaupunki",
                FOREIGNWORD: "city",
                SENTENCE: "Helsinki on suomen pääkaupunki",
                FOREIGNSENTENCE: "Helsinki is the capital city of Finland",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_city.png")
            },
            {
                ID: 46,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Kaupunki",
                WORD: "kerrostalo",
                FOREIGNWORD: "block of flats",
                SENTENCE: "Asuin kerrostalossa, kun olin opiskelija",
                FOREIGNSENTENCE: "I lived in a block of flats when I was a student",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_blockofflats.png")
            },
            {
                ID: 47,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Kaupunki",
                WORD: "talo",
                FOREIGNWORD: "house",
                SENTENCE: "Minä asun omassa talossa",
                FOREIGNSENTENCE: "I live in my own house",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_house.png")
            },
            {
                ID: 48,
                TOPIC:"Ympäristö",
                SUBTOPIC:"Kaupunki",
                WORD: "tie",
                FOREIGNWORD: "road",
                SENTENCE: "Autot ajavat teillä",
                FOREIGNSENTENCE: "Cars drive on roads",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/surroundings_road.png")
            }
        ]
    },
    {
        TOPIC:"Ihmiset",
        SUBTOPICS: ["Perhe", "Ammatit"],
        DESCRIPTION:"blah",
        SUBTOPICDATA: [
            {
                SUBTOPIC:"Perhe",
                DESCRIPTION:"Opi suvun käsitteitä",
                IMAGE: require("./../images/subtopic_icon_family.png")
            },
            {
                SUBTOPIC:"Ammatit",
                DESCRIPTION:"Opi ammattien nimiä",
                IMAGE: require("./../images/subtopic_icon_profession.png")
            }
        ],
        COURSEDATA: [
            {
                ID: 49,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Perhe",
                WORD: "Perhe",
                FOREIGNWORD: "family",
                SENTENCE: "Minulla on iso perhe",
                FOREIGNSENTENCE: "I have a big family",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/family_family.png")
            },
            {
                ID: 50,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Perhe",
                WORD: "isä",
                FOREIGNWORD: "father",
                SENTENCE: "Minun isäni on poliisi",
                FOREIGNSENTENCE: "My father is a police",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/family_father.png")
            },
            {
                ID: 51,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Perhe",
                WORD: "äiti",
                FOREIGNWORD: "mother",
                SENTENCE: "Äitini tekee paljon työtä kotona",
                FOREIGNSENTENCE: "My mother does a lot of work at home",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/family_mother.png")
            },
            {
                ID: 52,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Perhe",
                WORD: "veli",
                FOREIGNWORD: "brother",
                SENTENCE: "Minulla on yksi veli",
                FOREIGNSENTENCE: "I have one brother",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/family_brother.png")
            },
            {
                ID: 53,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Perhe",
                WORD: "sisko",
                FOREIGNWORD: "sister",
                SENTENCE: "Minulla ei ole yhtään siskoja",
                FOREIGNSENTENCE: "I do not have any sisters",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/family_sister.png")
            },
            {
                ID: 54,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Perhe",
                WORD: "serkku",
                FOREIGNWORD: "cousin",
                SENTENCE: "Minulla on serkku, joka elää Amerikassa",
                FOREIGNSENTENCE: "I have a cousin who lives in America",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/noimage.png")
            },
            {
                ID: 55,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Ammatit",
                WORD: "ammatti",
                FOREIGNWORD: "profession",
                SENTENCE: "Käymällä koulua voi saada ammatin",
                FOREIGNSENTENCE: "By going to school you can get a profession",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/profession_profession.png")
            },
            {
                ID: 56,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Ammatit",
                WORD: "poliisi",
                FOREIGNWORD: "police",
                SENTENCE: "Isäni on poliisi",
                FOREIGNSENTENCE: "My father is a police",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/profession_police.png")
            },
            {
                ID: 57,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Ammatit",
                WORD: "lääkäri",
                FOREIGNWORD: "doctor",
                SENTENCE: "Lääkäri on tärkeä ammatti",
                FOREIGNSENTENCE: "Doctor is an important profession",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/profession_doctor.png")
            },
            {
                ID: 58,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Ammatit",
                WORD: "koodari",
                FOREIGNWORD: "coder",
                SENTENCE: "Koodari työskentelee tietokoneella",
                FOREIGNSENTENCE: "The coder works on a computer",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/profession_coder.png")
            },
            {
                ID: 59,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Ammatit",
                WORD: "Myyjä",
                FOREIGNWORD: "Salesperson",
                SENTENCE: "Myyjä yrittää myydä tuotteita",
                FOREIGNSENTENCE: "A salesperson tries to sell products",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/profession_salesperson.png")
            },
            {
                ID: 60,
                TOPIC:"Ihmiset",
                SUBTOPIC:"Ammatit",
                WORD: "palomies",
                FOREIGNWORD: "fireman",
                SENTENCE: "Palomies on vaativa ammatti",
                FOREIGNSENTENCE: "A firefighter is a demanding profession",
                FOREIGNSOUND: "",
                FOREIGNSENTENCESOUND:"",
                IMAGE: require("./../images/profession_fireman.png")
            }
        ]
    }
]

export default fin_eng;