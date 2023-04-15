import { Link } from "react-router-dom";
import useHomeDoc from "../hooks/useHomeDoc";
import IllustrationOne from "../assets/illustration-one";
import IllustrationTwo from "../assets/illustration-two";
import IllustrationThree from "../assets/illustration-three";

const Home = () => {
  const IllustrationWrapper = ({ children }) => (
    <div className="w-[135px] h-[150px]">{children}</div>
  );

  const Illustration = ({ img: { src, alt } }) => (
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  );

  const HomeLink = ({ link: { route, title } }) => (
    <Link to={route}>
      <button className="p-2 px-8 block mx-auto rounded-md text-white text-sm font-semibold bg-brand-black">
        {title}
      </button>
    </Link>
  );

  const { title, description, links, illustrations } = useHomeDoc();

  const IllustrationRow = () => (
    <div className="flex flex-col gap-10 justify-center items-center sm:flex-row mt-10">
      {illustrations?.map((img) => (
        <IllustrationWrapper key={img.src}>
          <Illustration img={img} />
        </IllustrationWrapper>
      ))}
    </div>
  );

  return (
    <div className="w-[600px] max-w-full mx-auto">
      <h2 className="text-4xl font-semibold text-center mt-3 text-brand-black">
        {title}
      </h2>

      <p className="my-10 text-center text-sm text-brand-black">
        {description}
      </p>

      <div className="flex justify-center gap-x-3">
        {links?.map((link, i) => (
          <HomeLink link={link} key={link.route + i} />
        ))}
      </div>

      <IllustrationRow />
    </div>
  );
};

export default Home;
