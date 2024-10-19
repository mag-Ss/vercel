type IconProps = {
  className?: string;
  strokeWidth?: number;
};
export default function GithubIcon({
  className = "w-6 h-6",
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M12 1C5.9225 1 1 5.84 1 11.8093C1 16.5861 4.1515 20.6368 8.52125 22.065C9.07125 22.1668 9.27292 21.8322 9.27292 21.5453C9.27292 21.2886 9.26375 20.6084 9.25917 19.7073C6.19933 20.3591 5.554 18.2572 5.554 18.2572C5.0535 17.0096 4.33025 16.6759 4.33025 16.6759C3.33383 16.0058 4.40725 16.0196 4.40725 16.0196C5.51183 16.0948 6.09208 17.1333 6.09208 17.1333C7.07292 18.7861 8.667 18.3085 9.29583 18.0326C9.39483 17.3332 9.67808 16.8574 9.9925 16.587C7.54958 16.3166 4.982 15.3871 4.982 11.2456C4.982 10.0658 5.40825 9.1015 6.11408 8.34525C5.99033 8.07208 5.61908 6.973 6.21033 5.48433C6.21033 5.48433 7.13158 5.19467 9.23533 6.59258C10.1153 6.35242 11.0503 6.23325 11.9853 6.22775C12.9203 6.23325 13.8553 6.35242 14.7353 6.59258C16.8253 5.19467 17.7466 5.48433 17.7466 5.48433C18.3378 6.973 17.9666 8.07208 17.8566 8.34525C18.5578 9.1015 18.9841 10.0658 18.9841 11.2456C18.9841 15.3981 16.4128 16.312 13.9653 16.5778C14.3503 16.9023 14.7078 17.5651 14.7078 18.578C14.7078 20.0245 14.6941 21.1868 14.6941 21.5379C14.6941 21.8212 14.8866 22.1594 15.4503 22.0513C19.8513 20.6323 23 16.5788 23 11.8093C23 5.84 18.0748 1 12 1Z"
        fill="currentColor"
      />
    </svg>
  );
}
