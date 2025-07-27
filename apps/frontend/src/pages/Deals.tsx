import { useDeals } from '../api/deals';

export default function Deals() {
  const { data, isLoading } = useDeals();

  if (isLoading) return <p>Loading deals...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Deals</h1>
      <ul>
        {data?.map((deal: any) => (
          <li key={deal.id}>
            {deal.name} - ${deal.value} - {deal.stage}
          </li>
        ))}
      </ul>
    </div>
  );
}
