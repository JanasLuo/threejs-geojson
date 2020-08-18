import ThreeMap from './ThreeMap';
var THREE = require('three') //正确
import pic1 from './img/lightray.jpg';
import pic2 from './img/lightray_yellow.jpg';

export default class ThreeMapLightBar extends ThreeMap {
  constructor(set, geojson) {
    super(set, geojson)
    this.textures = [new THREE.TextureLoader().load(pic1), new THREE.TextureLoader().load(pic2)];
    this.colors = ['#fff', 'ffeb3b'];
  }

  drawLightBar(data) {
    const group = new THREE.Group();
    const texture = new THREE.TextureLoader().load(pic1);
    //texture.rotation.x = Math.PI;
    data.forEach((d, i) => {
      const { cp } = this.vector3Json[d.name];
      const [x, y, z] = this.lnglatToVector(cp);
      this.vector3Json[d.name].vector3 = [x, y, z];
      var geomentry = new THREE.PlaneGeometry(1, d.value / 5);
      var material = new THREE.MeshBasicMaterial({
        //map: texture,
        map: this.textures[i % 2], ////颜色贴图
        color: '#ffff00',
        transparent: true,
        opacity: 0.7,
        depthTest: false, //深度测试属性
        blending: THREE.AdditiveBlending, //滤镜选择
        side: THREE.DoubleSide
      })
      var plane = new THREE.Mesh(geomentry, material);
      plane.position.set(x, y, -(z + d.value / 5 / 2));
      plane.rotation.x = Math.PI / 2;
      group.add(plane);
      var plane2 = plane.clone();
      plane2.rotation.y = Math.PI / 2;
      group.add(plane2);
      group.add(this.addButtomPlate([x, y, z]));

    });
    group.rotation.y = Math.PI;
    this.scene.add(group);
    // this.divRender()
  }

  addButtomPlate(point, i) {
    var geomentry = new THREE.CircleGeometry(0.4, 6);
    var material = new THREE.MeshBasicMaterial({
      color: this.colors[i % 2],
      side: THREE.DoubleSide

    })
    var circle = new THREE.Mesh(geomentry, material);
    const [x, y, z] = point;
    circle.position.set(x, y, z);
    return circle;
  }

  drawFlyLine(data) {
    const group = new THREE.Group();
    data.forEach(d => {
      const { source, target } = d;
      //console.log(this.vector3Json[source.name]);
      const [x0, y0, z0] = this.vector3Json[source.name].vector3;
      const [x1, y1, z1] = this.vector3Json[target.name].vector3;

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x0, y0, z0),
        new THREE.Vector3((x0 + x1) / 2, (y0 + y1) / 2, -10),
        new THREE.Vector3(x1, y1, z1),
      )

      const points = curve.getPoints(10);
      const geomentry = new THREE.Geometry();
      geomentry.vertices = points;
      const material = new THREE.LineBasicMaterial({
        vertexColors: THREE.vertexColors,
        //color: '#ff0000',
        //transparent: true,
        //opacity: 0.6,
        //side: THREE.DoubleSide
      });
      const line = new THREE.Line(geomentry, material);
      group.add(line);
    })
    group.rotation.y = Math.PI;
    this.scene.add(group)
  }
  //三维坐标转屏幕坐标
}