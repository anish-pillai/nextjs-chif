import EditEventContent from '@/components/admin/EditEventContent';

// Export the page component that Next.js will render
export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <EditEventContent id={id} />;
}
