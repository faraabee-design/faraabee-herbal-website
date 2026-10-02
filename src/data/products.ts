import { Product } from '../types';

import herbalOilImg from '../assets/images/farabi_herbal_oil_amber_1790683559368.jpg';
import herbalBalmImg from '../assets/images/farabi_herbal_balm_jar_1790683575568.jpg';
import hairElixirImg from '../assets/images/farabi_hair_elixir_bottle_1790683590806.jpg';
import olivesImg from '../assets/images/farabi_botanical_olives_1790683606379.jpg';
import clovesImg from '../assets/images/farabi_botanical_cloves_1790683626855.jpg';
import tonicInfusionImg from '../assets/images/farabi_apothecary_craft_1790683645646.jpg';

export const products: Product[] = [
  {
    id: 'faraabee-hair-scalp-oil',
    slug: 'botanical-hair-scalp-oil',
    name: 'Botanical Hair & Scalp Oil',
    urduName: 'مقویِ مو ہربل تیل',
    category: 'Herbal Oils',
    price: 1850,
    currency: 'PKR',
    volume: '100 ml / 3.4 fl oz',
    shortDescription:
      'A deeply restorative herbal infusion of sweet almond, amla, bhringraj, and rosemary crafted to nourish the scalp and hair roots.',
    description:
      'FARAABEE Botanical Hair & Scalp Oil is formulated following time-tested herbal tradition. Prepared with pure cold-pressed carrier oils and slow-macerated whole herbs including Amla, Bhringraj, and Black Seed, this lightweight yet deeply nourishing formulation supports hair strand vitality, calms dry scalp, and imparts a natural, healthy sheen.',
    image: herbalOilImg,
    secondaryImage: hairElixirImg,
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    ingredients: [
      'Sweet Almond Oil (Prunus Amygdalus Dulcis)',
      'Sesame Seed Oil (Sesamum Indicum)',
      'Amla Fruit Extract (Phyllanthus Emblica)',
      'Bhringraj Leaf Extract (Eclipta Prostrata)',
      'Black Seed Oil (Nigella Sativa)',
      'Rosemary Leaf Essential Oil (Rosmarinus Officinalis)',
      'Tocopherol (Natural Vitamin E)',
    ],
    keyBotanicals: [
      { name: 'Amla', benefit: 'Rich in antioxidants, traditionally used for strand strength' },
      { name: 'Bhringraj', benefit: 'The quintessential Ayurvedic herb for root nourishment' },
      { name: 'Nigella Sativa', benefit: 'Valued in Eastern herbalism for deep scalp balancing' },
    ],
    traditionalUse:
      'Traditionally applied as a warm scalp massage oil (Champi) before bathing or left overnight to gently nourish hair follicles and promote relaxation.',
    directions:
      'Dispense 8–12 drops into your palms. Gently massage into scalp using circular fingertip motions. Work through hair lengths. Leave on for at least 45 minutes or overnight, then wash with a mild herbal cleanser.',
    precautions:
      'For external wellness use only. Conduct a patch test on forearm prior to first application. Store in a cool, shaded environment away from direct sunlight.',
    packagingInfo:
      'Supplied in an amber UV-protective pharmaceutical glass bottle with a calibrated precision glass pipette dropper.',
  },
  {
    id: 'faraabee-soothing-botanical-balm',
    slug: 'soothing-botanical-balm',
    name: 'Soothing Botanical Balm',
    urduName: 'سکون بخش ہربل مرہم',
    category: 'Herbal Balms',
    price: 1450,
    currency: 'PKR',
    volume: '50 g / 1.7 oz',
    shortDescription:
      'A comforting botanical salve infused with German chamomile, natural beeswax, and calming plant essences for weary joints and temples.',
    description:
      'Crafted in small, careful batches, the FARAABEE Soothing Botanical Balm pairs the gentle emollience of cold-pressed virgin olive oil and unrefined beeswax with calming botanicals. Gently warming upon application with faint herbal aromatic notes of chamomile, eucalyptus, and mint, it offers restorative comfort after long days.',
    image: herbalBalmImg,
    secondaryImage: tonicInfusionImg,
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    ingredients: [
      'Extra Virgin Olive Oil (Olea Europaea)',
      'Pure Cera Alba (Natural Beeswax)',
      'German Chamomile Flower Extract (Matricaria Chamomilla)',
      'Natural Menthol Crystals',
      'Eucalyptus Leaf Oil (Eucalyptus Globulus)',
      'Clove Bud Oil (Syzygium Aromaticum)',
      'Calendula Officinalis Extract',
    ],
    keyBotanicals: [
      { name: 'Chamomile', benefit: 'Renowned for gentle skin-calming botanical properties' },
      { name: 'Pure Beeswax', benefit: 'Forms a breathable natural botanical moisture barrier' },
      { name: 'Clove Bud', benefit: 'Imparts gentle comfort and comforting natural warmth' },
    ],
    traditionalUse:
      'Traditionally utilized in Unani and botanical wellness practices to rub over tired muscles, temples, neck, and chest during seasonal changes or fatigue.',
    directions:
      'Warm a small pea-sized amount between fingers and gently massage onto targeted areas—temples, nape of neck, shoulders, or joints—using steady circular motions.',
    precautions:
      'Avoid contact with broken skin, eyes, and mucous membranes. Not suitable for infants. For topical herbal wellness use only.',
    packagingInfo:
      'Housed in an apothecary-grade heavy dark emerald glass jar with a hermetically sealed brushed bronze cap.',
  },
  {
    id: 'faraabee-nourishing-botanical-elixir',
    slug: 'nourishing-botanical-elixir',
    name: 'Nourishing Botanical Elixir',
    urduName: 'عرقِ نباتات مصفی اکسیر',
    category: 'Botanical Elixirs',
    price: 2200,
    currency: 'PKR',
    volume: '50 ml / 1.7 fl oz',
    shortDescription:
      'A golden, fast-absorbing botanical facial nectar of jojoba, black seed, rosehip, and pure frankincense for supple skin balance.',
    description:
      'A testament to botanical minimalism, this concentrated elixir delivers essential fatty acids and botanical nutrients. By blending cold-pressed golden jojoba with unrefined Ethiopian black seed oil and wild rosehip seed oil, FARAABEE creates a silky, non-comedogenic elixir that calms environmental dryness and enhances skin moisture retention.',
    image: hairElixirImg,
    secondaryImage: herbalOilImg,
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    ingredients: [
      'Golden Jojoba Seed Oil (Simmondsia Chinensis)',
      'Cold-Pressed Black Seed Oil (Nigella Sativa)',
      'Rosehip Seed Oil (Rosa Canina)',
      'Plant-Derived Squalane',
      'Frankincense Resin Essential Oil (Boswellia Carterii)',
      'True Lavender Flower Oil (Lavandula Angustifolia)',
    ],
    keyBotanicals: [
      { name: 'Black Seed (Kalonji)', benefit: 'Celebrated for centuries in Eastern tradition for vital balance' },
      { name: 'Rosehip Seed', benefit: 'Naturally rich in provitamin A and essential omega fatty acids' },
      { name: 'Frankincense', benefit: 'Revered resin delivering soothing aromatic calm' },
    ],
    traditionalUse:
      'Used traditionally in royal apothecary preparations as an evening botanical oil to replenish dry skin and soften facial texture.',
    directions:
      'Warm 3 to 4 drops in palm of clean hands and gently press into damp face and neck morning or evening following your water-based routine.',
    precautions:
      'Perform a spot patch test prior to initial use. Discontinue if redness occurs. Avoid contact with inner eye.',
    packagingInfo:
      'Presented in a frosted UV-filtering cosmetic bottle with a sustainable natural wooden cap and fine dropper.',
  },
  {
    id: 'faraabee-olive-bay-vitalizing-oil',
    slug: 'olive-bay-vitalizing-oil',
    name: 'Olive & Bay Vitalizing Body Oil',
    urduName: 'زیتون و غار مقوی تیل',
    category: 'Herbal Oils',
    price: 1650,
    currency: 'PKR',
    volume: '120 ml / 4.0 fl oz',
    shortDescription:
      'Sun-pressed Mediterranean olive oil gently infused with bay laurel leaf and citrus blossom for all-over body nourishment.',
    description:
      'Honoring ancient Mediterranean and Levantine botanical bathing traditions, this silky body oil harnesses the moisture of first cold-pressed olive fruit oil combined with the uplifting herbaceous aroma of wild bay laurel leaves. It absorbs smoothly without heaviness, leaving skin hydrated and delicately scented with pure botanicals.',
    image: olivesImg,
    secondaryImage: tonicInfusionImg,
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewsCount: 22,
    ingredients: [
      'Extra Virgin Olive Fruit Oil (Olea Europaea)',
      'Sweet Almond Oil (Prunus Amygdalus Dulcis)',
      'Bay Laurel Leaf Essential Oil (Laurus Nobilis)',
      'Cold-Pressed Castor Seed Oil (Ricinus Communis)',
      'Neroli Flower Extract (Citrus Aurantium)',
      'Sunflower Seed Tocopherol',
    ],
    keyBotanicals: [
      { name: 'Olive Fruit', benefit: 'Deeply emollient, rich in squalene and oleic acid' },
      { name: 'Bay Laurel Leaf', benefit: 'Crisp aromatic traditional cleansing and toning herb' },
      { name: 'Neroli Blossom', benefit: 'Gentle floral botanical aroma for peace of mind' },
    ],
    traditionalUse:
      'Used traditionally after warm baths or hammam rituals to seal in moisture and rejuvenate tired skin.',
    directions:
      'Smooth over warm, damp skin immediately after bathing or showering. Massage with long upward strokes towards the heart.',
    precautions:
      'For external body use only. Do not ingest. Store in a cool dry space.',
    packagingInfo:
      'Heavy-base apothecary glass bottle with aluminum protective screw cap.',
  },
  {
    id: 'faraabee-clove-camphor-chest-rub',
    slug: 'clove-camphor-chest-rub',
    name: 'Clove & Camphor Warming Herbal Rub',
    urduName: 'لونگ و کافور ہربل لیپ',
    category: 'Herbal Balms',
    price: 1250,
    currency: 'PKR',
    volume: '40 g / 1.4 oz',
    shortDescription:
      'A comforting, vaporous herbal balm infused with whole clove, camphor, and eucalyptus to provide soothing warmth during winter cold spells.',
    description:
      'Rooted in centuries of household herbal remedies, the FARAABEE Clove & Camphor Warming Herbal Rub provides soothing vapours and gentle warmth. Prepared with pure unrefined mustard oil, natural beeswax, and steam-distilled clove and camphor, it brings prompt herbal comfort to the chest, back, and throat.',
    image: clovesImg,
    secondaryImage: herbalBalmImg,
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 19,
    ingredients: [
      'Cold-Pressed Mustard Seed Oil (Brassica Juncea)',
      'Natural Unrefined Beeswax',
      'Natural Camphor Crystals (Cinnamomum Camphora)',
      'Clove Bud Oil (Syzygium Aromaticum)',
      'Eucalyptus Leaf Oil (Eucalyptus Globulus)',
      'Thymol (Thyme Extract)',
    ],
    keyBotanicals: [
      { name: 'Clove Bud', benefit: 'Comforting warmth and distinct aromatic herbal heritage' },
      { name: 'Camphor', benefit: 'Time-tested vaporous botanical soothing agent' },
      { name: 'Eucalyptus', benefit: 'Clean, clarifying herbaceous respiratory aroma' },
    ],
    traditionalUse:
      'A classic cold-season rub rubbed onto the chest, soles of feet, and back before bedtime.',
    directions:
      'Gently rub a moderate layer across upper chest and throat area. Cover with warm clothing. May also be applied to soles of feet.',
    precautions:
      'Avoid eyes, nostrils, or broken skin. Not for use on children under 6 years. For external application only.',
    packagingInfo:
      'Recyclable dark green apothecary glass jar with metal screw cap.',
  },
  {
    id: 'faraabee-apothecary-herbal-infusion',
    slug: 'apothecary-herbal-infusion',
    name: 'Traditional Herbal Joshanda Botanical Blend',
    urduName: 'روایتی جوشاندہ مقوی',
    category: 'Herbal Preparations',
    price: 1950,
    currency: 'PKR',
    volume: '150 g / 5.3 oz Loose Blend',
    shortDescription:
      'A curated loose-leaf botanical preparation of whole licorice root, holy basil, malabar nut, and cardamom for gentle seasonal herbal decoctions.',
    description:
      'Joshanda (meaning "prepared by boiling" in traditional Eastern herbalism) has stood as a cornerstone of household wellness for centuries. FARAABEE’s Apothecary Herbal Infusion contains hand-sorted whole botanicals with zero artificial sweeteners, powders, or preservatives. Brewed gently in water, it releases a comforting, aromatic steam and rich earthen herbal flavor.',
    image: tonicInfusionImg,
    secondaryImage: clovesImg,
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
    ingredients: [
      'Whole Licorice Root (Glycyrrhiza Glabra)',
      'Tulsi / Holy Basil Leaves (Ocimum Sanctum)',
      'Malabar Nut / Vasaka Leaves (Justicia Adhatoda)',
      'Green Cardamom Pods (Elettaria Cardamomum)',
      'Fennel Seeds (Foeniculum Vulgare)',
      'Marshmallow Root (Althaea Officinalis)',
    ],
    keyBotanicals: [
      { name: 'Licorice Root (Mulethi)', benefit: 'Naturally sweet and deeply soothing for throat comfort' },
      { name: 'Tulsi (Holy Basil)', benefit: 'Revered adaptogen supporting daily immune resilience' },
      { name: 'Cardamom', benefit: 'Aromatic digestive balance and exquisite fragrance' },
    ],
    traditionalUse:
      'Traditionally simmered in water and consumed warm with honey during cold weather or seasonal climate transitions.',
    directions:
      'Add 1 tablespoon of botanical blend to 2 cups of fresh water. Simmer gently over low heat for 7–10 minutes until liquid reduces slightly. Strain into a cup. Enjoy warm, plain or sweetened with raw honey.',
    precautions:
      'Consult with your healthcare practitioner if pregnant or managing hypertension prior to regular licorice consumption.',
    packagingInfo:
      'Sealed in an airtight, food-grade botanical pouch inside an artisanal cylindrical paper tube.',
  },
];
