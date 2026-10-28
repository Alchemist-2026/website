// Brand Copywriting & Curated Asset Database for ALCHEMIST – THE LAKE VIEWERY
import marcusImg from "./MD.jpeg"; 
import thomasImag from "./thomas.jpg";
import pastaImag from "./pasta.png";
import friesImag from "./fries.png";
import pizzaImag from "./pizza.png";
import burgerImag from "./burger.png";
import riceImag from "./fr.png";
import mtImag from "./mocktail.png";
import cofImag from "./coffee.png";
import shakeImag from "./ms.png";
import dessertImag from "./dessert.png";
import sandwichImag from "./sand.png";
import accomImag from "./gobi.jpg";
// Local image import for testimonial avatar
export const BRAND_INFO = {
  name: "ALCHEMIST",
  subtitle: "THE LAKE VIEWERY",
  //tagline: "Where Every Sip Meets The Lake",
  //description: "Welcome to Alchemist Lake Viewery Cafe, a lakeside escape designed for people who want more than just a meal — an experience. Nestled beside a shimmering lake, our open-air and dome seating areas blend nature, food, and imagination into one unforgettable evening. Whether you're here for a quiet coffee with a view, a celebration with friends, or a night of immersive gaming under the stars, Alchemist transforms every visit into a memory.",
  whatsappLink: "https://wa.me/919092502555?text=Hi%2C%20I%20would%20like%20to%20reserve%20a%20table.",
  instagramLink: "https://www.instagram.com/alchemist_lakeview?dlrf=MXhwN2l1ZWdnOHdvMw==",
  phone: "+91 90925 02555",
  email: "info@alchemistlv.com",
  address: "Eco park, New Bupathy Nagar Street, Chennai, Tamil Nadu 600031",
  hours: [
    { days: "Monday - Thursday", time: "09:00 AM - 11:00 PM" },
    { days: "Friday - Saturday", time: "08:00 AM - 01:00 AM" },
    { days: "Sunday", time: "08:00 AM - 11:00 PM" }
  ]
};

export const ABOUT_STATS = [
  { value: "5000+", label: "Happy Visitors" },
  { value: "50+", label: "Signature Dishes" },
 // { value: "5-Star", label: "Dining Rating" },
 // { value: "100%", label: "Lakefront Seating" }
];

//export const ABOUT_DETAILS = {
//  sectionTitle: "The Venue",
//  title: "🌿 VENUE – A SPACE LIKE NO OTHER",
//  paragraph1: "Immerse yourself in a one-of-a-kind lakeside setting designed for comfort, beauty, and versatility.",
//  features: [
//    "Lakeside seating with breathtaking scenic views",
//    "Open-air café and aesthetic dome seating",
//    "Private café zones for intimate gatherings",
//    "Dome theatre experience",
//    "Banquet hall for events and celebrations",
//    "Nature-inspired ambience for a peaceful escape"
//  ],
//  paragraph2: "Whether you're here for a casual coffee or a grand celebration, the venue adapts to your mood.",
//  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" // High-end lakeview cafe interior
//};

export const FOOD_CATEGORIES = [
  { id: "starters", label: "Starters", image: friesImag },
  { id: "pasta", label: "Pasta", image: pastaImag },
  { id: "pizza", label: "Pizza", image: pizzaImag },
  { id: "burgers", label: "Burgers", image: burgerImag },
  { id: "pan-asian", label: "Pan Asian", image: riceImag },
  { id: "mocktails", label: "Mocktails", image: mtImag },
  { id: "sandwiches", label: "Sandwich Deck", image: sandwichImag },
  { id: "hot-beverages", label: "Hot Beverages", image: cofImag },
  { id: "accompaniments", label: "Accompaniments", image: accomImag },
  { id: "milkshakes", label: "Milkshakes", image: shakeImag },
  { id: "desserts", label: "Desserts", image: dessertImag }
];

export const FOOD_MENU = {
  starters: [
    { title: "French Fries", description: "Golden, crispy sea-salt dusted premium potato fries, served with house-made smoked garlic aioli.", price: 200, tags: ["Veg"] },
    { title: "Peri Peri Fries", description: "Fiery, crispy golden fries tossed in our signature African peri-peri spice dust.", price: 220, tags: ["Veg", "Spicy"] },
    { title: "Garlic Bread", description: "Toasted baguette slices brushed with garlic-infused extra virgin olive oil and parsley.", price: 220, tags: ["Veg", "Classic"] },
    { title: "Cheese Garlic Bread", description: "Artisan baguette loaded with garlic butter, topped with a melted, bubbling mozzarella blend.", price: 250, tags: ["Veg", "Premium"] },
    { title: "Chicken Pop Corn", description: "Bite-sized tender chicken breast pieces crusted in crispy panko breadcrumbs and seasoned with spices.", price: 280, tags: ["Non-Veg"] },
    { title: "Chicken Loaded Fries", description: "Crispy fries smothered in warm cheese sauce, topped with grilled chicken bits and jalapenos.", price: 300, tags: ["Non-Veg", "Rich"] },
    { title: "Fish Finger", description: "Premium fresh-catch fish strips, crusted in crispy breadcrumbs, served with house dill tartar sauce.", price: 390, tags: ["Non-Veg", "Seafood"] },
    { title: "Peri Peri Chicken", description: "Tender chicken skewers marinated in spicy peri-peri marinade and grilled to perfection.", price: 390, tags: ["Non-Veg", "Spicy"] },
    { title: "Crispy Fried Chicken", description: "Buttermilk-marinated chicken portions, deep-fried to a crunchy golden crust, served with hot sauce.", price: 390, tags: ["Non-Veg", "Crispy"] },
    { title: "Chicken Samosa", description: "Flaky, golden pastry pyramids filled with spiced minced chicken and peas, served with mint chutney.", price: 260, tags: ["Non-Veg"] }
  ],
  pasta: [
    { title: "Alfredo Veg Pasta", description: "Freshly rolled pasta tossed in a rich, velvety double-cream Alfredo sauce, infused with aged parmigiano-reggiano and garlic.", price: 320, tags: ["Veg", "Classic"] },
    { title: "Alfredo Chicken Pasta", description: "Creamy Alfredo fettuccine tossed with wok-seared herb chicken strips, parmigiano, and parsley oil.", price: 350, tags: ["Non-Veg"] },
    { title: "Pink Sauce Veg Pasta", description: "Gourmet pasta in a hybrid creamy blend of roasted vine pomodoro and parmigiano-reggiano sauce.", price: 330, tags: ["Veg", "Popular"] },
    { title: "Pink Sauce Chicken Pasta", description: "Rich pink sauce pasta tossed with tender grilled chicken breasts and fresh micro basil.", price: 360, tags: ["Non-Veg"] },
    { title: "Red Sauce Veg Pasta", description: "Slow-cooked rustic Italian plum tomato sauce infused with fresh basil, black olives, and olive oil.", price: 320, tags: ["Veg", "Classic"] },
    { title: "Red Sauce Chicken Pasta", description: "Artisan pasta in zesty pomodoro sauce tossed with grilled chicken strips and shaved parmesan.", price: 350, tags: ["Non-Veg"] }
  ],
  pizza: [
    { title: "Classic Corn Cheese Pizza", description: "Woodfired sourdough pizza topped with sweet golden corn kernels, white cream base, and double mozzarella.", price: 380, tags: ["Veg"] },
    { title: "Paneer Tikka Pizza", description: "Clay-oven smoked paneer tikka cubes, red bell peppers, onions, mozzarella, and a mint drizzle.", price: 400, tags: ["Veg", "Tandoori"] },
    { title: "Chicken Tikka Pizza", description: "Sourdough crust topped with tandoori chicken tikka chunks, red onions, bell peppers, and fresh coriander.", price: 440, tags: ["Non-Veg", "Spicy"] },
    { title: "Chicken Kheema Pizza", description: "Spiced minced chicken (kheema), red onions, green chillies, and premium mozzarella on woodfired sourdough.", price: 460, tags: ["Non-Veg", "Spicy"] }
  ],
  burgers: [
    { title: "Veg Burger", description: "Gourmet vegetable patty, fresh tomato, butter lettuce, and house relish on toasted brioche.", price: 250, tags: ["Veg"] },
    { title: "Paneer Burger", description: "Crispy cottage cheese patty, cheddar cheese, caramelized shallots, and spiced mint mayo.", price: 270, tags: ["Veg"] },
    { title: "Chicken Burger", description: "Premium seasoned chicken patty, melting tandoori cheddar, caramelized onions, and house burger glaze.", price: 300, tags: ["Non-Veg"] }
  ],
  "pan-asian": [
    { title: "Classic Veg Fried Rice", description: "High-flame wok-fried jasmine rice tossed with crisp garden vegetables and light soy sauce.", price: 280, tags: ["Veg"] },
    { title: "Egg Fried Rice", description: "Wok-tossed jasmine rice with organic eggs, scallions, and light seasoning.", price: 290, tags: ["Egg"] },
    { title: "Chicken 65 Fried Rice", description: "Spicy wok-fried rice combined with our crispy southern-style Chicken 65 bites.", price: 340, tags: ["Non-Veg", "Spicy"] },
    { title: "Classic Chicken Fried Rice", description: "Classic stir-fried rice with wok-seared chicken strips and fresh vegetables.", price: 330, tags: ["Non-Veg"] },
    { title: "Prawn Fried Rice", description: "Premium wok-tossed jasmine rice with plump, fresh ocean prawns and spring scallions.", price: 360, tags: ["Non-Veg", "Seafood"] },
    { title: "Veg Fried Noodles", description: "Wok-tossed thin noodles with crunchy garden vegetables, soy, and white pepper.", price: 290, tags: ["Veg"] },
    { title: "Egg Fried Noodles", description: "Stir-fried wheat noodles with scrambled organic eggs and fresh green vegetables.", price: 300, tags: ["Egg"] },
    { title: "Chicken 65 Fried Noodles", description: "Wok-fried noodles tossed with spicy, crispy Chicken 65 pieces and green onions.", price: 350, tags: ["Non-Veg", "Spicy"] },
    { title: "Chicken Fried Noodles", description: "Wok-tossed wheat noodles with tender chicken strips and colorful bell peppers.", price: 340, tags: ["Non-Veg"] },
   // { title: "Prawn Fried Noodles", description: "Stir-fried noodles loaded with succulent ocean prawns and fresh crisp vegetables.", price: 370, tags: ["Non-Veg", "Seafood"] }
  ],
  mocktails: [
    { title: "Virgin Mojito", description: "Fresh muddled mint leaves, lime wedges, simple syrup, topped with sparkling club soda.", price: 220, tags: ["Mocktail", "Refreshing"] },
    { title: "Sexy Pink Ocean", description: "A tropical blend of pomegranate syrup, grapefruit soda, fresh lime, and a splash of sparkling tonic.", price: 320, tags: ["Mocktail", "Signature"] },
    { title: "Orange Mojito", description: "Zesty muddled orange wedges, mint, simple syrup, fresh lime, and sparkling water.", price: 230, tags: ["Mocktail"] },
    { title: "Ocean Blue", description: "Vibrant blue curaçao syrup, fresh lemon juice, mint sprigs, topped with lemon-lime soda.", price: 250, tags: ["Mocktail"] },
    { title: "Cinderella", description: "A classic non-alcoholic cocktail blending pineapple, orange, and lemon juices with a splash of grenadine.", price: 240, tags: ["Mocktail"] },
    { title: "Iced Tea Lemon", description: "Chilled black tea brew infused with fresh lemon juice and organic honey.", price: 280, tags: ["Mocktail"] }
  ],
  sandwiches: [
    { title: "Cheese Grilled Sandwich", description: "Toasted country sourdough grilled with a thick, melting multi-layered blend of premium cheeses.", price: 200, tags: ["Veg"] },
    { title: "Corn Cheese Sandwich", description: "Sweet golden corn kernels mixed with fresh mozzarella, grilled between buttered bread slices.", price: 240, tags: ["Veg"] },
    { title: "Veg Grilled Sandwich", description: "Triple-decker stacked with sliced cucumber, tomato, cheddar, crispy lettuce, and herb spread.", price: 250, tags: ["Veg"] },
    { title: "Paneer Tikka Sandwich", description: "Clay-oven smoked paneer tikka cubes, red onions, capsicum, and mint spread inside grilled bread.", price: 260, tags: ["Veg", "Spicy"] },
    { title: "Chicken Grilled Sandwich", description: "Slow-cooked herb-shredded chicken breast, fresh butter lettuce, and house mayo on toasted sourdough.", price: 280, tags: ["Non-Veg"] },
    { title: "Chicken Tikka Sandwich", description: "Tandoori chicken tikka chunks layered with mint chutney, sliced onions, and melted mozzarella.", price: 300, tags: ["Non-Veg", "Spicy"] }
  ],
  "hot-beverages": [
    { title: "Coffee Mug", description: "Freshly brewed premium house-blend espresso with steamed velvety whole milk.", price: 189, tags: ["Hot Beverage", "Caffeine"] },
    { title: "Green Tea with honey", description: "Steeped organic green tea leaves served with a side of pure organic wild honey.", price: 149, tags: ["Hot Beverage", "Healthy"] },
    { title: "Hot chocolate", description: "Melted premium dark Belgian chocolate whisked into warm, creamy whole milk.", price: 280, tags: ["Hot Beverage", "Rich"] },
    { title: "Hot Milo", description: "Velvety warm milk blended with rich malted chocolate Milo powder, topped with cocoa.", price: 220, tags: ["Hot Beverage"] }
  ],
  accompaniments: [
    { title: "Paneer Manchurian", description: "Crispy paneer cubes tossed in a sweet, sour, and spicy Manchurian sauce with green scallions.", price: 300, tags: ["Veg"] },
    { title: "Gobi Manchurian", description: "Crispy cauliflower florets in a rich, tangy ginger-garlic soy reduction.", price: 290, tags: ["Veg"] },
    { title: "Chicken Manchurian", description: "Crispy chicken bites tossed in a savory, garlic-heavy dark soy gravy.", price: 340, tags: ["Non-Veg"] },
    { title: "Dragon Chicken", description: "Crispy chicken strips tossed in a fiery red sweet-chili paste with toasted cashew nuts.", price: 360, tags: ["Non-Veg", "Spicy"] },
    { title: "Marry Me Chicken", description: "Tender chicken breasts pan-seared in a luxurious cream sauce of sun-dried tomatoes, spinach, and parmesan.", price: 380, tags: ["Non-Veg", "Signature"] }
  ],
  milkshakes: [
    { title: "Vanilla Milkshake", description: "Classic Madagascar vanilla bean extract blended rich with premium gelato and whole milk.", price: 250, tags: ["Beverage"] },
    { title: "Mango Milkshake", description: "Thick Alfonso mango pulp blended with vanilla bean ice cream and organic milk.", price: 260, tags: ["Beverage"] },
    { title: "Chocolate Milkshake", description: "Rich, premium melted dark chocolate blended thick with chocolate gelato.", price: 280, tags: ["Beverage", "Chocolate"] },
    { title: "Strawberry Milkshake", description: "Sweet mountain strawberries blended thick with vanilla bean ice cream and fresh cream.", price: 300, tags: ["Beverage"] },
    { title: "Oreo Milkshake", description: "Crushed Oreo cookies blended with chocolate fudge, vanilla gelato, and fresh milk.", price: 340, tags: ["Beverage", "Chocolate"] },
    { title: "Milo Milkshake", description: "Rich chocolate malt Milo powder blended thick with vanilla gelato and whole milk.", price: 340, tags: ["Beverage"] },
    { title: "Nutella Milkshake", description: "Creamy hazelnut Nutella spread blended thick with vanilla bean gelato and whole milk.", price: 380, tags: ["Beverage", "Signature"] },
    { title: "Cold Coffee", description: "Double shot of premium espresso blended thick with vanilla gelato and whole milk.", price: 360, tags: ["Beverage", "Caffeine"] }
  ],
  desserts: [
    { title: "Hot Choco Brownie with Ice Cream", description: "Warm, rich dark-chocolate walnut brownie served with a scoop of premium vanilla bean gelato.", price: 240, tags: ["Dessert", "Classic"] },
    { title: "Tiramisu", description: "Layers of espresso-soaked ladyfinger cookies and rich mascarpone cream, dusted with cocoa powder.", price: 260, tags: ["Dessert", "Signature"] },
    { title: "Rose Tres Leches", description: "Light sponge cake soaked in a sweet three-milk blend infused with organic rose water.", price: 250, tags: ["Dessert"] },
    { title: "Mango Tres Leches", description: "Delicate sponge cake soaked in a mango-infused three-milk blend, topped with mango slices.", price: 250, tags: ["Dessert", "Seasonal"] },
    { title: "Banoffee", description: "A classic English dessert pie made from bananas, cream, and a thick caramel sauce on a pastry base.", price: 260, tags: ["Dessert"] }
  ]
};

export const SIGNATURE_DISHES = [
  {
    title: "Premium Penne Alfredo",
    description: "Our signature gourmet pasta. Fresh penne tossed in a rich, velvety double-cream Alfredo sauce, infused with aged parmigiano-reggiano, freshly shaved garlic, and herbs.",
    image: pastaImag,
    badges: ["Rich", "Creamy", "Comforting"],
   // price: 320
  },
  {
    title: "Classic Italian Tiramisu",
    description: "A decadent Italian masterpiece. Layers of espresso-soaked ladyfingers and velvety mascarpone cream, dusted with cocoa powder, handcrafted fresh daily.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
    badges: ["Handcrafted", "Fresh Daily", "Espresso-Infused"],
    //price: 260
  },
 // {
 //   title: "Classic Chicken Kheema Pizza",
 //   description: "Artisan woodfired sourdough pizza topped with spiced minced chicken (kheema), red onions, green chillies, and premium mozzarella.",
 //   image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
 //   badges: ["Sourdough", "Spiced Kheema", "Double Cheese"],
 //   price: 460
 // }
];

export const GAMING_INFO = {
  headline: "LEVEL UP YOUR EXPERIENCE",
  subheadline: "From competitive PlayStation 5 lounges to fully immersive high-end virtual reality adventures.",
  features: [
    {
      title: "PlayStation 5 VIP Zone",
      description: "Play inside acoustically insulated, ultra-plush leather cockpits with 75\" Samsung Neo QLED 4K 120Hz displays and bespoke 3D spatial surround sound.",
      accent: "ps5",
      iconName: "Gamepad2",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Immersive VR Arena",
      description: "Equipped with state-of-the-art headsets, haptic vests, and multi-directional treadmills for standard-setting high-fidelity active gaming.",
      accent: "vr",
      iconName: "VrHeadset",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&q=80"
    },
    //{
    //  title: "Esports Multiplayer Booths",
    //  description: "Co-op gaming stations designed for friends and clans, loaded with standard pre-releases and ultra-responsive competitive titles.",
    //  accent: "gold",
    //  iconName: "Users",
    //  image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80"
    //},
    //{
    //  title: "Professional Motion Simulators",
    //  description: "Step into full-axis motion simulators calibrated to hyper-realistic racing and flight mechanics with triple-wrap monitors.",
    //  accent: "gold",
    //  iconName: "Tv",
    //  image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80"
    //}
  ]
};

export const VR_DETAILS = {
  headline: "STEP INSIDE ANOTHER WORLD",
  description: "Our state-of-the-art Virtual Reality Arena hosts a curated library of next-generation VR games. Embark on epic cooperative sci-fi campaigns, survive intense zombie waves alongside your friends, or test your skills in fast-paced competitive PvP arenas. Solve intricate mysteries in multiplayer VR escape rooms, or enjoy breathtaking cinematic journeys through deep stellar nebulae and mysterious ocean trenches.",
  features: [
    "Sci-Fi Co-Op & Zombie Survival",
    "Competitive PvP & VR Esports",
    "Multiplayer Escape Room Quests",
    "Cinematic Space & Sea Expeditions"
  ],
  image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80"
};

export const DOME_THEATRE = {
  headline: "THE DOME THEATRE",
  description: "A architectural masterpiece. The Alchemist Dome is a 360° fully-immersive dome theatre utilizing advanced 8K laser-projection mapping and Dolby Atmos spatial dome sound. The physical ceiling disappears, surrounding you in astronomical spatial visuals, hyper-realistic wilderness tours, or curated cosmic visual journeys.",
  features: [
    { title: "360° Laser Projection", desc: "No borders. A seamless 8K resolution hemispherical sky overhead." },
    { title: "Cosmic Exploration", desc: "Soar through deep nebula clouds and fly past Saturn's rings." },
    { title: "Dolby Atmos Dome Sound", desc: "Every sound localized dynamically to match visual flight paths." },
    { title: "Bespoke Private Events", desc: "Transform the dome ceiling into customized graphics or starry skies." }
  ],
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" // High-end nebula / cosmic projection
};

export const PHOTO_GALLERY = [
  {
    title: "Lakeside Sunset Coffee",
    category: "Lakeside View",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Gold-Leaf Burger Prep",
    category: "Signature Culinary",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Immersive VR Arena",
    category: "Gaming Lounge",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Lounge Leather Cockpits",
    category: "Premium Gaming",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Celestial Dome Projection",
    category: "Dome Theatre",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Woodfired Artisan Pizza",
    category: "Artisan Cafe",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS = [
  
  {
    name: "Aria Sterling",
    role: "Interior Designer",
    review: "Had a wonderful experience! The food was delicious, the ambience was beautiful, and the service was excellent. A perfect place to relax and enjoy quality time. Highly recommended!.",
    rating: 5,
    avatar: "https://static.vecteezy.com/system/resources/previews/000/622/795/non_2x/vector-s-letter-logo.jpg"
  },
  {
    name: "Helan Vishal",
    role: "Junior Software Engineer",
    review: "Absolutely loved my experience at Alchemist Lake Viewery! 🌿✨ The beautiful lake view, peaceful ambience, delicious food, and friendly service made the visit really special. It’s a perfect spot to relax, spend time with friends or family, and enjoy a great evening. The atmosphere is definitely one of the highlights. Highly recommended! ",
    rating: 5,
    avatar: marcusImg
  },
  {
    name: "Thomas",
    role: "Local Guide",
    review: "Visited Alchemist Lake View Cafe and honestly, this is one of the most stunning rooftop cafés I've ever visited! The ambience is absolutely premium, with a luxurious setup, elegant interiors, and a breathtaking view overlooking the lake. It's a perfect place to relax, enjoy good food, and capture some amazing photos.I tried the Alfredo Pasta, and it was incredibly creamy, rich, and full of flavour.",
    rating: 5,
    avatar: thomasImag
  }
];
