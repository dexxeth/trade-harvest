"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with a label";

const chartData = [
	{ day: "Monday", desktop: 186 },
	{ day: "Tuesday", desktop: 305 },
	{ day: "Wednesday", desktop: 237 },
	{ day: "Thursday", desktop: 73 },
	{ day: "Friday", desktop: 209 },
	{ day: "Saturday", desktop: 214 },
	{ day: "Sunday", desktop: 156 },
];

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "hsl(var(--chart-1))",
	},
	// mobile: {
	// 	label: "Mobile",
	// 	color: "hsl(var(--chart-2))",
	// },
} satisfies ChartConfig;

export function Graph() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Wheat</CardTitle>
				<CardDescription>Last 7 days rate</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Line
							dataKey="desktop"
							type="natural"
							stroke="var(--color-desktop)"
							strokeWidth={2}
							dot={{
								fill: "var(--color-desktop)",
							}}
							activeDot={{
								r: 6,
							}}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Line>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					Trending up by 5.2% this month{" "}
					<TrendingUp className="h-4 w-4" />
				</div>
				{/* <div className="leading-none text-muted-foreground">
					Showing total visitors for the last 6 months
				</div> */}
			</CardFooter>
		</Card>
	);
}
