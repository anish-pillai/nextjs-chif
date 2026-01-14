import EditLeadershipContent from '@/components/admin/EditLeadershipContent';

// Export the page component that Next.js will render
export default async function EditLeadershipMember({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <EditLeadershipContent id={id} />;
}
