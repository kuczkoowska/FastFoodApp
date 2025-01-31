import LanguageSelector from "./components/LanguageSelector";
import OrderType from "./components/OrderType";
import Admin from "./components/Admin";
import KFCIcon from "../public/kfc-ico.svg";

function Home() {
  return (
    <>
      <Admin />
      <main className="flex flex-col items-center justify-center gap-y-10 mt-10">
        <KFCIcon width="250" height="250" />
        <h1 className="text-5xl font-bold text-center mt-10">ORDER HERE!</h1>
        <div>
          <OrderType />
          <LanguageSelector />
        </div>
      </main>
      <footer className="flex flex-row items-center justify-center gap-x-5 fixed bottom-0 w-full bg-white p-4 ">
        <p>
          <a
            href="https://amrestcdn.azureedge.net/kfc-web-ordering/KFC/TOU/amrest-privacy-policy-pl.pdf"
            className="uppercase"
          >
            privacy policy
          </a>
        </p>
        <a
          href="https://kfc.pl/assets/uploads/KFC_Wartosci_Odzywcze_Alergeny.pdf"
          className="uppercase"
        >
          <p>nutritional values ​​and allergens</p>
        </a>
      </footer>
    </>
  );
}

export default Home;
