// pages/report.js
import { Card, Table } from 'flowbite-react';

const ReportPage = () => {
  const reportData = [
    { id: 1, name: 'John Doe', amount: '$1200', date: '2025-02-01' },
    { id: 2, name: 'Jane Smith', amount: '$900', date: '2025-02-02' },
    { id: 3, name: 'Alice Johnson', amount: '$1500', date: '2025-02-03' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Report View</h1>

      <Card className="mb-4">
        <h2 className="text-2xl font-semibold">Report Details</h2>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {reportData.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>{item.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="text-gray-700">
          The report shows detailed financial information for the users listed above. It includes the amounts and transaction dates for each individual.
        </p>
      </Card>
    </div>
  );
};

export default ReportPage;
