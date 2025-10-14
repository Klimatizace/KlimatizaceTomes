export function CheckIcon(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={props.className ?? 'h-4 w-4'}
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.43.02L3.3 9.54A1 1 0 1 1 4.7 8.16l3.07 3.02 6.5-6.594a1 1 0 0 1 1.434.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}
