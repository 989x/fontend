# Question

What is the better approach for handling the link to another page: within the `ListNews` file or the `CardContent` file?

Both approaches have their merits, and the best choice depends on your specific needs and design preferences. Here's a breakdown of each approach:

### Handling the Link in `ListNews`
1. **Centralized Logic:**
   - Pros: Centralizes the navigation logic in one place, making it easier to manage and update if the routing logic changes.
   - Cons: Increases the complexity of the `ListNews` component, potentially making it harder to maintain.

2. **Better Control:**
   - Pros: Allows for more control over how navigation is handled, including potential pre-navigation checks or data fetching.
   - Cons: Less reusable, as the navigation logic is tied to the `ListNews` component.

### Handling the Link in `CardContent`
1. **Component Reusability:**
   - Pros: Makes the `CardContent` component more reusable across different parts of your application, as it encapsulates its own navigation logic.
   - Cons: May require passing additional props (like `id` and `router`) to the `CardContent` component.

2. **Separation of Concerns:**
   - Pros: Keeps the `ListNews` component focused on fetching and displaying data, while the `CardContent` component handles user interactions.
   - Cons: Might make the `CardContent` component slightly more complex.

### Recommendation
If the navigation is specifically tied to the cards and could be used elsewhere, encapsulating the logic within the `CardContent` component would be more modular and reusable. If the navigation logic is specific to the `ListNews` component and unlikely to be reused, handling it within `ListNews` might be more straightforward.

Here’s how you can handle it in the `CardContent` component for better reusability:

```typescript
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const CardContent: React.FC<CardProps> = ({
  id,
  image,
  title,
  description,
  date,
  category,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/th/news/content/${id}`);
  };

  return (
    <div className='w-full cursor-pointer' onClick={handleCardClick}>
      <div
        style={{ height: '200px', position: 'relative' }}
        className='flex items-center justify-center w-full mb-4'
      >
        <Image
          src={image}
          alt={title}
          layout='fill'
          objectFit='cover'
          className='rounded-md'
        />
      </div>
      <div>
        {/* section 1 */}
        <div className='text-[16px] font-base text-gray-400 flex justify-between mb-3'>
          <p>{date}</p>
          <div className='flex gap-3'>
            <div>O</div>
            <p>1,000</p>
          </div>
        </div>
        {/* section 2 */}
        <h3 className='text-xl font-semibold text-start text-pretty mb-3'>
          {title}
        </h3>
        {/* section 3 */}
        <p className='text-gray-600 text-start text-pretty h-12 overflow-hidden overflow-ellipsis mb-3'>
          {description}
        </p>
        {/* section 4 */}
        <p className='text-[16px] font-base text-[#4CBC55] flex justify-start'>
          {category}
        </p>
      </div>
    </div>
  );
};

export default CardContent;
```

Update the `ListNews` component accordingly:

```typescript
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Section from "../../format/Section";
import CardContent from "../../cards/CardContent";
import TabSwitcher from "../../format/TabSwitcher";
import { fetchNews } from "@/api/fetchData";
import { formatDate } from "@/utils/formatDate";

type TopicNews = {
  id: string;
  imageUrl: string;
  alt: string;
  category: string;
  titleNews: string;
  date: string;
  description: string;
};

const ListNews: React.FC = () => {
  const [topic, setTopic] = useState<TopicNews[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNews();
      if (Array.isArray(newsData)) {
        const formattedNews = newsData.map((news: any) => ({
          id: news.id,
          imageUrl: news.thumbnail.url,
          alt: news.title,
          category: news.category[0]?.name || '',
          titleNews: news.title,
          date: formatDate(news.created_at),
          description: news.abstract,
        }));
        setTopic(formattedNews);
      }
    };
    getNews();
  }, []);

  const tabs = [
    'ทั้งหมด', 
    'ธุรกิจ', 
    'สัมมนา', 
    'การร่วมมือ', 
    'ความยั่งยืนและความรับผิดชอบต่อสังคม',
    'ประกาศ'
  ];

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const content = tabs.map(tab => (
    <div key={tab}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 -mx-4">
        {topic.slice(0, visibleCount).map((card, index) => (
          <div key={index} className="mb-6">
            <CardContent
              id={card.id}
              image={card.imageUrl}
              date={card.date}
              category={card.category}
              title={card.titleNews}
              description={card.description}
            />
          </div>
        ))}
      </div>
      {visibleCount < topic.length && (
        <div className="flex justify-center mt-10">
          <button onClick={loadMore} className="border-2 border-[#4CBC55] rounded-full px-6 items-center ">
            <p className="text-[#4CBC55] p-2">ดูเพิ่มเติม</p>
          </button>
        </div>
      )}
    </div>
  ));

  return (
    <Section>
      <div className="text-[32px] font-[600] pl-5 pt-10 text-[#3C3C3C]">ข่าวสาร INET</div>
      <TabSwitcher tabs={tabs} content={content} />
    </Section>
  );
};

export default ListNews;
```
