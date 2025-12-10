import { ActivityListProvider } from "@/components/ActivitiesList";
import ActivityForm from "@/components/ActivityForm/ActivityForm";

export default function HomePage() {
  const router = useRouter();
  const [deleteSucess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    if (router.query.deleted === "true") {
      setDeleteSuccess(true);

      router.replace("/", undefined, { shallow: true });
      setTimeout(() => setDeleteSuccess(false), 3000);
    }
  }, [router]);

  return (
    <>
      {deleteSucess && (
        <StatusMessage $success>Activity has been deleted.</StatusMessage>
      )}
      <ActivityForm />
      <ActivityListProvider />
    </>
  );
}

const StatusMessage = styled.p`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: bold;
  background-color: ${(props) => (props.$success ? "#e6ffe6" : "#ffe6e6")};
  border: 1px solid ${(props) => (props.$success ? "#00a000" : "#d00000")};
  color: ${(props) => (props.$success ? "#008000" : "#b00000")};
`;
