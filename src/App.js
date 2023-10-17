import * as React from 'react';
import {
	TextField,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './App.css';
const columns = [
	{ id: 'name', label: 'Action' },
	{ id: 'code', label: 'ID' },
	{
		id: 'startDate',
		label: 'Start Date'
	},
	{
		id: 'endDate',
		label: 'End Date'
	},
	{
		id: 'monthYear',
		label: 'Month, Year'
	},
	{
		id: 'datesExcluded',
		label: 'Dates Excluded'
	},
	{
		id: 'numDays',
		label: 'Number of Days'
	},
	{
		id: 'leadCount',
		label: 'Lead Count'
	},
	{
		id: 'expectedDdr',
		label: 'Expected DDR'
	},
	{
		id: 'lastUpdated',
		label: 'Last Updated'
	}
];

function createData(name, code, population, size) {
	const density = population / size;
	return { name, code, population, size, density };
}

const rows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767)
];

export default function StickyHeadTable() {
	const [ startDate, setStartDate ] = React.useState(null);
	const [ endDate, setEndDate ] = React.useState(null);
	const [ excludedDates, setExcludedDates ] = React.useState([]);
	const [ leadCount, setLeadCount ] = React.useState(null);
	const [ ddr, setDDR ] = React.useState(null);

	const startDateChange = (newVal) => {
		setStartDate(newVal);
	};
	const endDateChange = (newVal) => {
		setEndDate(newVal);
	};
	const leadCountChange = (e) => {
		setLeadCount(e.target.value);
	};
	const ddrChange = (e) => {
		setDDR(e.target.value);
	};
	return (
		<Paper elevation={false} sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ height: '100vh' }}>
				<Table sx={{ padding: 2 }} stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
						</TableRow>
						<TableRow>
							<TableCell>N/A</TableCell>
							<TableCell>N/A</TableCell>
							<TableCell>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={[ 'DatePicker' ]}>
										<DatePicker
											label="Start Date"
											onChange={startDateChange}
											value={startDate}
											maxDate={endDate}
										/>
									</DemoContainer>
								</LocalizationProvider>
							</TableCell>
							<TableCell>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={[ 'DatePicker' ]}>
										<DatePicker
											label="End Date"
											onChange={endDateChange}
											value={endDate}
											minDate={startDate}
										/>
									</DemoContainer>
								</LocalizationProvider>
							</TableCell>
							<TableCell>-</TableCell>
							<TableCell>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={[ 'DatePicker' ]}>
										<DatePicker label="Dates Excluded" />
									</DemoContainer>
								</LocalizationProvider>
							</TableCell>
							<TableCell>-</TableCell>
							<TableCell>
								<TextField
									onChange={leadCountChange}
									value={leadCount}
									id="outlined-basic"
									label="Lead Count"
									variant="outlined"
								/>
							</TableCell>
							<TableCell>
								<TextField
									onChange={ddrChange}
									value={ddr}
									id="outlined-basic"
									label="Expected DDR"
									variant="outlined"
								/>
							</TableCell>
							<TableCell>
								<Button color="success" variant="contained" size="small">
									Save
								</Button>
								<Button color="error" variant="contained" size="small">
									Cancel
								</Button>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{column.format && typeof value === 'number' ? (
													column.format(value)
												) : (
													value
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
