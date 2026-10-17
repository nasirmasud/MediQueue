import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-surface px-4 transition-colors duration-200'>
      <div className='text-center space-y-4'>
        <div className='flex justify-center'>
          <Spinner size='lg' />
        </div>

        <div className='space-y-1'>
          <h2 className='text-headline-md text-primary tracking-tight animate-pulse'>
            Loading Content
          </h2>
          <p className='text-body-sm text-on-surface-variant'>
            Please wait a moment while we set things up for you...
          </p>
        </div>
      </div>
    </div>
  );
}
