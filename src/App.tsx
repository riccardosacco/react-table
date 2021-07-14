import { Column } from "react-table";
import useSWR from "swr";
import Table from "./Table";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

const App = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const columns: Column[] = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Address",
      columns: [
        {
          Header: "Street",
          accessor: "address.street",
        },
        {
          Header: "Suite",
          accessor: "address.suite",
        },
      ],
    },
  ];

  const { data } = useSWR<User[]>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div className="font-sans">
      <Table columns={columns} data={data}></Table>
    </div>
  );
};

export default App;
