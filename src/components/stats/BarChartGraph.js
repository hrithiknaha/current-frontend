import { ResponsiveContainer, Tooltip, XAxis, Bar, BarChart, YAxis } from "recharts";

const BarChartGraph = ({ data, fetchMovies, action }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} cursor="pointer">
                <XAxis dataKey="name" interval={0} style={{ fontSize: "0.7rem" }} />
                <YAxis width={20} style={{ fontSize: "0.7rem" }} />
                <Tooltip />
                <Bar dataKey="count" fill="#f95d6a" onClick={(e) => fetchMovies(e, action)} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartGraph;
