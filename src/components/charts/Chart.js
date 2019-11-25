import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

export default function Chart({options}) {
    const [loading, setLoading] = React.useState(true);

    function onChartReady(_) {
        setLoading(false);
    }

    function loader() {
        if (loading) {
            return (<CircularProgress />)
        } else return null;
    }

    return (<div style={(loading)? {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }: null}>
        {loader()}
        <ReactEchartsCore
            // style={(loading)? {visibility: 'none'}: null}
            notMerge={true}
            theme={"light"}
            echarts={echarts}
            option={options}
            onChartReady={onChartReady}
        />
    </div>)

}