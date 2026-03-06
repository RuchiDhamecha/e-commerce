import Pagination from '../../components/Pagination/Pagination';

interface FooterProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Footer = ({ page, total, limit, onPageChange }: FooterProps) => {
  return (
    <footer className="py-4 flex justify-center border-t border-gray-200 bg-white shrink-0">
      <Pagination page={page} total={total} limit={limit} onPageChange={onPageChange} />
    </footer>
  );
};

export default Footer;
