import StudentResultDetailPage from "@/components/pages/Student/Results/Detail";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  return <StudentResultDetailPage params={params} />;
}
