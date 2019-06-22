import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class ComposedBar extends PureComponent {
  static jsfiddleUrl = "//jsfiddle.net/alidingling/9wnuL90w/";

  render() {
    const { data } = this.props;
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" barSize={20} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default ComposedBar;
