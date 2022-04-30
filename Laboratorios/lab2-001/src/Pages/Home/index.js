import Header from "../../Components/Header";

const items = [
  {
    id: 1,
    name: "Stonebriar Antique Metal Votive Candle Lantern with Handle, 10",
    photo: "https://m.media-amazon.com/images/I/81q1jMFo3IL._AC_UL320_.jpg",
    location: "San José"
  },
  {
    id: 2,
    name: "MOON-1 Manual Coffee Grinder Antique Cast Iron",
    photo: "https://m.media-amazon.com/images/I/61FwUBmjANL._AC_UL320_.jpg",
    location: "Alajuela"
  },
  {
    id: 3,
    name: "Mikasa Antique White 40-Piece Dinnerware Set, Service for 8",
    photo: "https://m.media-amazon.com/images/I/41klLTbw3cL._AC_UL320_.jpg",
    location: "Heredia"
  },
  {
    id: 4,
    name: "Touch of Class Oliviana Covered Box Ivory/Gold",
    photo: "https://m.media-amazon.com/images/I/91zfO1P-NdL._AC_UL320_.jpg",
    location: "San José"
  }
]

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex gap-8 sm:px-4 md:px-8 lg:px-16 mt-8">
        {
          items.map((i) => {
            return (
              <div className="w-1/4" key={`product_${i.id}`}>
                <div className="w-full flex justify-center h-28 min-h-28 max-h-28">
                  <img className="h-full" src={i.photo} alt={i.name} />
                </div>
                <div className="w-full text-center pt-4">
                  <p className="font-bold">{i.name}</p>
                  <p className="text-sm text-slate-700">{i.location}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}