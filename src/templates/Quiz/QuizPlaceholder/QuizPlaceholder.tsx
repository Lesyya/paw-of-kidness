import React from 'react';
import Image from 'next/image';

import QuizPlaceholderImage from '@/assets/quiz_placeholder.png';
import QuizSuccessImage from '@/assets/quiz_success.png';

export type QuizPlaceholderProps = {
  success?: boolean;
};

const QuizPlaceholder: React.FC<QuizPlaceholderProps> = ({ success }) => {
  if (success) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-4">
        <h2 className="font-h3 text-orange-900">Ваша заявка надіслана на розгляд!</h2>
        <h2 className="font-h4 text-orange-700">Наш волонтер зв’яжеться з Вами після її обробки</h2>

        <Image src={QuizSuccessImage} alt="Dog happy birthday" className="my-4 rounded-xl" width={400} height={400} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-4">
      <h2 className="font-h4 text-orange-700">
        Ваша заявка оброблюється нашими волонтерами. Вони скоро Вам зателефонують!
      </h2>

      <Image src={QuizPlaceholderImage} alt="Cat" className="my-4 rounded-xl" width={400} height={400} />
    </div>
  );
};

export default QuizPlaceholder;
