"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let mobilesuits = [
  { id:1, model:"RX-78-2", name:"ガンダム", series:"機動戦士ガンダム", pilot:"アムロ・レイ", affiliation:"地球連邦軍" },
  { id:2, model:"GAT-X105", name:"ストライクガンダム", series:"機動戦士ガンダムSEED", pilot:"キラ・ヤマト", affiliation:"地球連合軍" },
  { id:3, model:"GN-001", name:"ガンダムエクシア", series:"機動戦士ガンダム00", pilot:"刹那・F・セイエイ", affiliation:"ソレスタルビーイング" },
  { id:4, model:"ASW-G-08", name:"ガンダム・バルバトス", series:"機動戦士ガンダム 鉄血のオルフェンズ", pilot:"三日月・オーガス", affiliation:"鉄華団" },
  { id:5, model:"XVX-016", name:"ガンダム・エアリアル", series:"機動戦士ガンダム 水星の魔女", pilot:"スレッタ・マーキュリー", affiliation:"アスティカシア高等専門学園" },
  { id:6, model:"gMS-Ω", name:"GQuuuuuuX", series:"機動戦士Gundam GQuuuuuuX", pilot:"アマテ・ユズリハ", affiliation:"ジオン公国軍" }
];

let guns = [
  { id:1, name:"M4A1", type:"アサルトライフル", caliber:"5.56×45mm", capacity:"20,30", origin:"アメリカ合衆国" },
  { id:2, name:"AK-47", type:"アサルトライフル", caliber:"7.62×39mm", capacity:"30", origin:"ソビエト連邦" },
  { id:3, name:"H&K MP5", type:"サブマシンガン", caliber:"9×19mm", capacity:"10,15,20,30,32", origin:"ドイツ" },
  { id:4, name:"Glock 17", type:"ハンドガン", caliber:"9×19mm", capacity:"17", origin:"オーストリア" },
  { id:5, name:"Beneli M4 Super 90", type:"ショットガン", caliber:"12Gauge", capacity:"7,8", origin:"イタリア" },
  { id:6, name:"Barret M82", type:"スナイパーライフル", caliber:"12.7×99mm", capacity:"10", origin:"アメリカ合衆国" }
];

let cars_list = [
  { id:1, name:"86（ZN6）", manufacturer:"トヨタ", engine:"FA20", displacement:"1,998cc", drivetype:"FR" },
  { id:2, name:"GT-R（R35）", manufacturer:"日産", engine:"VR38DETT", displacement:"3,779cc", drivetype:"4WD" },
  { id:3, name:"NSX（NC1）", manufacturer:"ホンダ", engine:"JNC", displacement:"3,492cc", drivetype:"4WD" },
  { id:4, name:"ロードスター（ND)", manufacturer:"マツダ", engine:"P5-VP", displacement:"1,496cc", drivetype:"FR" },
  { id:5, name:"RX-7（FD3S）", manufacturer:"マツダ", engine:"13B-REW", displacement:"1,308cc", drivetype:"FR" },
  { id:6, name:"シビック TypeR（FL5）", manufacturer:"ホンダ", engine:"K20C", displacement:"1,995cc", drivetype:"FR" }
];

app.get("/", (req, res) => {
  res.render('toppage');
});

// ガンダム一覧
app.get("/gundam", (req, res) => {
  res.render('gundam', {data: mobilesuits} );
});

// Create
app.get("/gundam/create", (req, res) => {
  res.redirect('/public/gundam_new.html');
});

// Read
app.get("/gundam/:number", (req, res) => {
  const number = req.params.number;
  const detail = mobilesuits[ number ];
  res.render('gundam_detail', {id: number, data: detail} );
});

// Delete
app.get("/gundam/delete/:number", (req, res) => {
  const number = Number(req.params.number);
  const detail = mobilesuits[number];
  res.render("gundam_delete", { id: number, data: detail });
});

app.post("/gundam/delete/:number", (req, res) => {
  const number = Number(req.params.number);
  mobilesuits.splice(number, 1);
  res.redirect("/gundam");
});

// Create
app.post("/gundam", (req, res) => {
  const id = mobilesuits.length + 1;
  const model = req.body.model;
  const name = req.body.name;
  const series = req.body.series;
  const pilot = req.body.pilot;
  const affiliation = req.body.affiliation;
  mobilesuits.push( { id: id, model: model, name: name, series: series, pilot: pilot, affiliation: affiliation } );
  console.log( mobilesuits );
  res.render('gundam', {data: mobilesuits} );
});

// Edit
app.get("/gundam/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = mobilesuits[ number ];
  res.render('gundam_edit', {id: number, data: detail} );
});

// Update
app.post("/gundam/update/:number", (req, res) => {
  mobilesuits[req.params.number].model = req.body.model;
  mobilesuits[req.params.number].name = req.body.name;
  mobilesuits[req.params.number].series = req.body.series;
  mobilesuits[req.params.number].pilot = req.body.pilot;
  mobilesuits[req.params.number].affiliation = req.body.affiliation;
  console.log( mobilesuits );
  res.redirect('/gundam' );
});

// 銃一覧
app.get("/firearm", (req, res) => {
  res.render('firearm', {data: guns} );
});

// Create
app.get("/firearm/create", (req, res) => {
  res.redirect('/public/firearm_new.html');
});

// Read
app.get("/firearm/:number", (req, res) => {
  const number = req.params.number;
  const detail = guns[ number ];
  res.render('firearm_detail', {id: number, data: detail} );
});

// Delete
app.get("/firearm/delete/:number", (req, res) => {
  const number = Number(req.params.number);
  const detail = guns[number];
  res.render("firearm_delete", { id: number, data: detail });
});

app.post("/firearm/delete/:number", (req, res) => {
  const number = Number(req.params.number);
  guns.splice(number, 1);
  res.redirect("/firearm");
});

// Create
app.post("/firearm", (req, res) => {
  const id = guns.length + 1;
  const name = req.body.name;
  const type = req.body.type;
  const caliber = req.body.caliber;
  const capacity = req.body.capacity;
  const origin = req.body.origin;
  guns.push( { id: id, name: name, type: type, caliber: caliber, capacity: capacity, origin: origin } );
  console.log( guns );
  res.render('firearm', {data: guns} );
});

// Edit
app.get("/firearm/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = guns[ number ];
  res.render('firearm_edit', {id: number, data: detail} );
});

// Update
app.post("/firearm/update/:number", (req, res) => {
  guns[req.params.number].name = req.body.name;
  guns[req.params.number].type = req.body.type;
  guns[req.params.number].caliber = req.body.caliber;
  guns[req.params.number].capacity = req.body.capacity;
  guns[req.params.number].origin = req.body.origin;
  console.log( guns );
  res.redirect('/firearm' );
});

// 車一覧
app.get("/cars", (req, res) => {
  res.render('cars', {data: cars_list} );
});

// Create
app.get("/cars/create", (req, res) => {
  res.redirect('/public/cars_new.html');
});

// Read
app.get("/cars/:number", (req, res) => {
  const number = req.params.number;
  const detail = cars_list[ number ];
  res.render('cars_detail', {id: number, data: detail} );
});

// Delete
app.get("/cars/delete/:number", (req, res) => {
  const number = Number(req.params.number);
  const detail = cars_list[number];
  res.render("cars_delete", { id: number, data: detail });
});

app.post("/cars/delete/:number", (req, res) => {
  const number = Number(req.params.number);
  cars_list.splice(number, 1);
  res.redirect("/cars");
});

// Create
app.post("/cars", (req, res) => {
  const id = cars_list.length + 1;
  const name = req.body.name;
  const manufacturer = req.body.manufacturer;
  const engine = req.body.engine;
  const displacement = req.body.displacement;
  const drivetype = req.body.drivetype;
  cars_list.push( { id: id, name: name, manufacturer: manufacturer, engine: engine, displacement: displacement, drivetype: drivetype } );
  console.log( cars_list );
  res.render('cars', {data: cars_list} );
});

// Edit
app.get("/cars/edit/:number", (req, res) => {
  const number = req.params.number;
  const detail = cars_list[ number ];
  res.render('cars_edit', {id: number, data: detail} );
});

// Update
app.post("/cars/update/:number", (req, res) => {
  cars_list[req.params.number].name = req.body.name;
  cars_list[req.params.number].manufacturer = req.body.manufacturer;
  cars_list[req.params.number].engine = req.body.engine;
  cars_list[req.params.number].displacement = req.body.displacement;
  cars_list[req.params.number].drivetype = req.body.drivetype;
  console.log( cars_list );
  res.redirect('/cars' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
