import { useState, useEffect } from 'react';

interface Banner {
  image: string;
  title: string;
  detail: string;
}

function BannerSection() {
  const [shuffledBanners, setShuffledBanners] = useState<Banner[]>([]);

  const BannerExample: Banner[] = [
    {
      image: 'https://example.com/banner1.jpg',
      title: 'Banner 1',
      detail: 'Banner 1 details',
    },
    {
      image: 'https://example.com/banner2.jpg',
      title: 'Banner 2',
      detail: 'Banner 2 details',
    },
    {
      image: 'https://example.com/banner3.jpg',
      title: 'Banner 3',
      detail: 'Banner 3 details',
    },
    {
      image: 'https://example.com/banner4.jpg',
      title: 'Banner 4',
      detail: 'Banner 4 details',
    },
  ];

  useEffect(() => {
    const shuffleDelay = 5000; // delay in milliseconds

    const shuffleBanners = () => {
      // Shuffle the BannerExample array
      const shuffled = BannerExample.sort(() => Math.random() - 0.5);
      setShuffledBanners(shuffled);
    };

    const shuffleInterval = setInterval(shuffleBanners, shuffleDelay);

    // Shuffle the banners immediately after the component mounts
    shuffleBanners();

    return () => clearInterval(shuffleInterval);
  }, []);

  return (
    <div className="flex overflow-x-scroll w-full gap-4">
      {shuffledBanners.map((item: Banner, i: number) => (
        <div className="border rounded-lg min-w-[340px] sm:min-w-[400px]" key={i}>
          <div>
            <img
              className="h-[180px] sm:h-[230px] w-full object-cover rounded-t-md"
              src={item.image}
              alt=""
            />
          </div>
          <div className="p-3 flex flex-col gap-1">
            <h2 className="textPost1 h-12 text-ellipsis overflow-hidden ...">{item.title}</h2>
            <p className="text2 h-[46px] text-ellipsis overflow-hidden ...">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
