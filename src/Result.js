export default ({ data, tileSet, draw }) => {
  return (
    <div>
      {data.map((tri, i1) => {
        return (
          <div
            key={tri + i1}
            style={{ display: "inline-block", paddingRight: "1rem" }}
          >
            {tri.map((item, index) => (
              <span
                key={item + index}
                style={draw === index ? { color: "deeppink" } : {}}
              >
                {tileSet[index]}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
