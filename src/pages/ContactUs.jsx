const ContactUs = () => {
  return (
    <div className=" text-white pt-20 px-4 selection:bg-lime-400 selection:text-black">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden bg-zinc-900/30 border border-zinc-800 rounded-[40px] backdrop-blur-xl">
          <h1 className="text-5xl text-center font-black italic uppercase tracking-tighter leading-none mb-2 mt-10">
            Contact Us
          </h1>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-400/10 blur-[100px] rounded-full" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start">
            <div className="flex flex-col items-center w-full md:w-auto">
              <p className="text-zinc-500 text-2xl text-center font-medium">
                Jika ada kendala atau ingin memberi masukan tentang DENFLIX,
                silakan hubungi kami: eMail: adent@gmail.com, Telepon:
                085173190648
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
