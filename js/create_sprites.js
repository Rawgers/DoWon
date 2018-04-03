const createSprites = (scene, camPos, radius, spriteCount) => {
  const sprites = [];
  for (let i = 0; i < spriteCount; i++) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      color: parseInt(Math.floor(Math.random() * (16 ** 6)).toString(16), 16),
      fog: false
    }));
    sprite.scale.set(1, 1, 1);
    sprite.position.set(...randomPositionInSquare(camPos, radius))
    scene.add(sprite);
    sprites.push(sprite);
  }
  return sprites;
}

const randomPositionInSquare = (camPos, radius) => {
  return [
    THREE.Math.randFloatSpread(radius * 2) + camPos.x,
    THREE.Math.randFloatSpread(radius * 2) + camPos.y,
    THREE.Math.randFloatSpread(radius * 2) + camPos.z
  ];
}

// const subwayImgNames = ['american', 'banana_peppers', 'black_forest_ham',
//  'black_olives', 'chipotle_southwest', 'cucumbers', 'flatbread', 'green_peppers',
//  'italian', 'italian_bmt', 'italian_herbs_and_cheese', 'jalapenos', 'lettuce',
//  'mayonnaise', 'meatball_marinara', 'monterey_cheddar', 'multi_grain_flatbread',
//  'mustard', 'nine_grain_wheat', 'oil', 'oven_roasted_chicken', 'pickles', 'ranch',
//  'red_onions', 'spinach', 'sweet_onion', 'sweet_onion_chicken_teriyaki', 'tomatoes',
//  'tuna', 'turkey_breast', 'vinaigrette', 'vinegar'];
//const pepperNames = ['horizontal_pepper', 'square_pepper', 'vertical_pepper'];