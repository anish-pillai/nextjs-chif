'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BranchForm } from '@/components/BranchForm';
import { ConfirmModal } from '@/components/ConfirmModal';
import Link from 'next/link';

interface ServiceFormData {
  id?: string;
  day: string;
  type: string;
  serviceType?: string;
  time: string;
  location: string;
  link?: string;
}

interface BranchFormData {
  id?: string;
  name: string;
  country?: string;
  address: string;
  phone: string;
  isActive: boolean;
  order: number;
  siteIds: string[];
  services?: ServiceFormData[];
}

export default function EditBranchPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingBranch, setEditingBranch] = useState<BranchFormData | null>(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'branch',
    id: '',
    title: '',
    message: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && session.user.role !== 'ADMIN' && session.user.role !== 'PASTOR') {
      router.push('/');
      return;
    }

    // Fetch branch details
    const fetchBranch = async () => {
      try {
        const resolvedParams = await params;
        console.log('Fetching branch with ID:', resolvedParams.id);
        const response = await fetch(`/api/branches/${resolvedParams.id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          throw new Error(errorData.error || `Failed to fetch branch: ${response.status}`);
        }
        
        const data = await response.json();
        const fullBranch = data.data;
        
        console.log('Branch data:', fullBranch);
        
        setEditingBranch({
          id: fullBranch.id,
          name: fullBranch.name,
          country: fullBranch.country || '',
          address: fullBranch.address,
          phone: fullBranch.phone,
          isActive: fullBranch.isActive,
          order: fullBranch.order,
          siteIds: fullBranch.branchSites?.map((bs: any) => bs.siteId) || [],
          services: fullBranch.services || []
        });
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch branch details');
      }
    };

    if (status === 'authenticated') {
      fetchBranch();
    }
  }, [status, session, router, params]);

  const handleSubmit = async (branchData: BranchFormData) => {
    try {
      const response = await fetch(`/api/branches/${editingBranch?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(branchData),
      });

      if (!response.ok) {
        throw new Error('Failed to update branch');
      }

      router.push('/admin?tab=branches');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDelete = () => {
    if (!editingBranch) return;
    
    setConfirmModal({
      isOpen: true,
      type: 'branch',
      id: editingBranch.id,
      title: 'Delete Branch',
      message: `Are you sure you want to delete "${editingBranch.name}"? This action cannot be undone.`
    });
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/branches/${confirmModal.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete branch');
      }

      router.push('/admin?tab=branches');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (status === 'loading' || loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!editingBranch) {
    return <div className="p-8 text-center">Loading branch details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Branch</h1>
        <Link 
          href="/admin?tab=branches" 
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Back to Branches
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <BranchForm
          branch={editingBranch}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/admin?tab=branches')}
          loading={loading}
          title="Edit Branch"
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  );
}
