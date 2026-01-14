import EditSermonContent from '@/components/admin/EditSermonContent';

// Export the page component that Next.js will render
export default async function EditSermonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <EditSermonContent id={id} />;
}
