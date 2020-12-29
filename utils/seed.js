const Keyboard = require('../models/keyboard');
const Comment = require('../models/comment');

const keyboard_seeds = [
    {
        brand: 'Massdrop',
        name: 'Drop CTRL',
        switches: 'Gateron Clear',
        size: '80% / TKL',
        keycapMaterial: 'PBT',
        keycapType: 'Doubleshot',
        backlighting: 'Full RGB',
        caseMaterial: 'Aluminium',
        description: "I'm baby cred subway tile neutra, la croix quinoa waistcoat chicharrones paleo vinyl organic man braid bushwick. IPhone etsy schlitz, kale chips la croix chia pabst green juice tnarwhal poke. Actually organic listicle hell of bespoke lumbersexual. Migas before they sold out tousled, pitchfork chia slow-carb organic craft beer pinterest. Salvia godard chicharrones, butcher venmo art party poutine freegan franzen hammock af four loko viral scenester. Small batch cold-pressed fashion axe sartorial pabst, glossier stumptown hoodie helvetica live-edge man braid wolf air plant synth. Enamel pin pinterest tofu palo santo semiotics salvia chillwave activated charcoal vexillologist cornhole",
        image: 'https://massdrop-s3.imgix.net/product-images/massdrop-ctrl-mechanical-keyboard/FP/j3vcDu6TTSCULWMjT9MR_0821.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&q=70'
    },
    {
        brand: 'Magicforce',
        name: 'Magicforce68 V2 Bluetooth',
        switches: 'Gateron Brown',
        size: 'Non-standard',
        keycapMaterial: 'PBT',
        keycapType: 'Dye Sublimated',
        backlighting: 'Limited Backlighting',
        caseMaterial: 'Plastic',
        description: "I'm baby cred subway tile neutra, la croix quinoa waistcoat chicharrones paleo vinyl organic man braid bushwick. IPhone etsy schlitz, kale chips la croix chia pabst green juice narwhal poke. Actually organic listicle hell of bespoke lumbersexual. Migas before they sold out tousled, pitchfork chia slow-carb organic craft beer pinterest. Salvia godard chicharrones, butcher venmo art party poutine freegan franzen hammock af four loko viral scenester. Small batch cold-pressed fashion axe sartorial pabst, glossier stumptown hoodie helvetica live-edge man braid wolf air plant synth. Enamel pin pinterest tofu +1 palo santo semiotics salvia chillwave activated charcoal vexillologist cornhole.",
        image: 'https://massdrop-s3.imgix.net/product-images/magicforce-68-v2-bluetooth-4-0-mehcanical-keyboard/FP/EHdC9uoCRzyGodWwHxSi_AI7B1429-copy.jpg?auto=format&fm=jpg&fit=fill&w=820&h=547&bg=f0f0f0&dpr=1&q=70'
    },
    {
        brand: 'TADA',
        name: 'TADA 68',
        switches: 'Cherry MX Black',
        size: 'Non-standard',
        keycapMaterial: 'PBT',
        keycapType: 'Doubleshot',
        backlighting: 'No Backlighting',
        caseMaterial: 'Plastic',
        description: "I'm baby cred subway tile neutra, la croix quinoa waistcoat chicharrones paleo vinyl organic man braid bushwick. IPhone etsy schlitz, kale chips la croix chia pabst green juice narwhal poke. Actually organic listicle hell of bespoke lumbersexual. Migas before they sold out tousled, pitchfork chia slow-carb organic craft beer pinterest. Salvia godard chicharrones, butcher venmo art party poutine freegan franzen hammock af four loko viral scenester. Small batch cold-pressed fashion axe sartorial pabst, glossier stumptown hoodie helvetica live-edge man braid wolf air plant synth. Enamel pin pinterest tofu +1 palo santo semiotics salvia chillwave activated charcoal vexillologist cornhole.",
        image: 'https://cdn.shopify.com/s/files/1/1473/3902/products/3_95227a88-9020-459a-ba31-8e719c6ad0d7_1800x1800.jpg?v=1584436613'
    }
]

const seed = async () => {
    // Delete all the current keyboards and comments
    await Keyboard.deleteMany();
    console.log("Deleted all keyboards...");

    await Comment.deleteMany();
    console.log("Deleted all the comments...");

    // Create three new keyboards
    // for (const keyboard_seed of keyboard_seeds) {
    //     let keyboard = await Keyboard.create(keyboard_seed);
    //     console.log("Created a new keyboard:", keyboard.name);
    //     await Comment.create({
    //         user: "Keyboardluver69420",
    //         text: "I LOVED this keyboard. Seriously life changing, like omg wow.",
    //         keyboardId: keyboard._id
    //     });
    //     console.log("Created a new comment...");
    // }
    //Create a new comment for each keyboard
}

module.exports = seed;