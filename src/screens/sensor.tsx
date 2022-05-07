import React from "react";
import { View, Text, ScrollView} from "react-native";
import * as Sensors from "react-native-sensors";

type SType = keyof typeof Sensors.SensorTypes;

const axis = ["x", "y", "z"];
const availableSensors = {
  accelerometer: axis,
  gyroscope: axis,
  magnetometer: axis,
  barometer: ["pressure"],
};

export type MyProps = {}
type MyState = {
  [key: string]: any;
  subscription: any;
  count: number|string|boolean|null|undefined|object;
  error: any;
}

const Value: React.FC<{name:string, value:number} > = ({name, value}) => (
  <View>
    <Text>{name}:</Text>
    <Text>{new String(value).substr(0, 8)}</Text>
  </View>
)

const genericSensorView = (sensorType: SType, fields: string[]) => {
  const sensor$: any = Sensors[sensorType]

  return class SensorComp extends React.Component<MyProps,MyState,any> {
    constructor(props: any){
      super(props);
      const initialValue = fields.reduce((carry, val) => ({ ...carry, [val]: 0}),{});
      this.state = initialValue;
      // code
    }
    componentWillMount() {
      const subscription = sensor$.subscribe({
        next: (v:any) => this.setState({ ...v}),
        error:(e:any) => this.setState({error: e}),
        complete:() => console.info("complete")
      });
      this.setState({ subscription});
    }
    componentDidUpdate(){
      // do somthidn when component update
    }
    componentWillUnmount() {
      this.state.subscription.unsubscribe();
      this.setState({ subscription: null });
    }
    render (){
      return (
        <View>
          <Text>values</Text>
          {fields.map((valueName) => (
            <Value key={sensorType + valueName} name={valueName} value={this.state[valueName]}/>
          ))}
        </View>)
    }
  }
}
const viewComponents = Object.entries(availableSensors).map(([name, values]: any) => genericSensorView(name, values));
export const Sensor: React.FC = () => {


  const exampleList: String[] = ["eka", "toka", "kolmas"]

  return (
    <View>
      <Text>Sensor</Text>
      <ScrollView>
      {
        // exampleList.map((item) => <View key = {"item-"+ item}><Text> {item} </Text></View>)
      }
      {
        viewComponents.map((Comp:any, index) =><Comp key={"sensor-" + index}/>)
      }
      </ScrollView>
    </View>);

};

export default Sensor;