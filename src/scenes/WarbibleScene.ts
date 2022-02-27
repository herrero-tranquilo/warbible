import Player from "../characters/Player";

export default class BuildingScene extends Phaser.Scene {
  constructor(private player: Phaser.Physics.Matter.Sprite) {
    super("WarbibleScene");
  }
  preload() {
    this.load.image(
      "_warbible_item",
      `${process.env.PUBLIC_URL}/assets/maps/source/warbible_item.png`
    );
    this.load.image(
      "_warbible",
      `${process.env.PUBLIC_URL}/assets/maps/source/warbible.png`
    );
    this.load.tilemapTiledJSON(
      "_map",
      `${process.env.PUBLIC_URL}/assets/maps/map.json`
    );
    this.load.audio(
      "bgm",
      `${process.env.PUBLIC_URL}/assets/maps/source/bgm.mp3`
    );
    Player.preload(this);
  }
  create() {
    this.createEmitter();
  }
  update() {
    this.player.update();
  }
  createEmitter() {
    const map = this.make.tilemap({ key: "_map" });
    const tilesetWarbible = map.addTilesetImage("warbible", "_warbible");
    const tilesetWarbibleItem = map.addTilesetImage(
      "warbible_item",
      "_warbible_item"
    );

    map.createLayer("tile", [tilesetWarbible], 0, 0);
    map.createLayer("item", [tilesetWarbibleItem], 0, 0);
    // this.matter.world.convertTilemapLayer(map.getLayer("collide").tilemapLayer);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.player = new Player({
      scene: this,
      x: map.widthInPixels / 2,
      y: map.heightInPixels,
      texture: "_character",
      frame: "character_walk_down_3",
    });
    this.cameras.main.startFollow(this.player, true);
    const bgm = this.game.sound.add("bgm");
    bgm.play();
  }
}
