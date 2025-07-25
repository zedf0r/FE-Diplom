export const Icon = ({ className, id }: { className: string; id: string }) => {
  return (
    <svg className={className}>
      <use href={"../../img/sprite.svg" + "#" + id} />
    </svg>
  );
};
