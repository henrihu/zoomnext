import { Input } from 'antd';

export default ({ length = 4, value, onChange }) => {
  return (
    <div className="flex justify-center gap-2">
      {Array(length)
        .fill(null)
        .map((v, index) => (
          <Input
            id={`pin-${index}`}
            key={index}
            value={value[index] && value[index]}
            onChange={(e) => {
              onChange(
                Array(length)
                  .fill(null)
                  .map((cur, i) => (i === index ? e.target.value : value[i]))
              );
            }}
            autoFocus={index === 0}
            className="font-bold text-center"
            style={{
              width: 48,
              height: 48,
              fontSize: 30,
              backgroundColor: 'aliceblue',
            }}
            maxLength={1}
          />
        ))}
    </div>
  );
};
