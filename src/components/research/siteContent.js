const siteContent = {
  title: "Adaptive Neural Compression via Learned Entropy Models",
  tagline:
    "Pushing the Pareto frontier of neural data compression with adaptive, content-aware entropy coding",
  authors: [
    { name: "Alice Zhang", affiliation: "UC San Diego", link: "https://example.com/alice" },
    { name: "Bob Kumar", affiliation: "MIT CSAIL", link: "https://example.com/bob" },
    { name: "Carol Chen", affiliation: "Google DeepMind", link: "https://example.com/carol" },
    { name: "David Park", affiliation: "Stanford University", link: "https://example.com/david" }
  ],
  venue: "NeurIPS 2026 - Spotlight",
  paperLink: "https://arxiv.org/abs/2025.00000",
  codeLink: "https://github.com/example/adaptive-neural-compression",
  demoLink: "#demo",
  teaserImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
  teaserCaption:
    "Our method adaptively allocates bits across spatial regions, achieving state-of-the-art rate-distortion performance.",

  abstract:
    "Neural compression methods have made remarkable progress in closing the gap with traditional codecs, yet they often treat all spatial regions uniformly during entropy coding. We introduce Adaptive Neural Compression (ANC), a framework that learns content-aware entropy models capable of dynamically allocating bitrate based on local image complexity. Our approach combines a lightweight spatial attention module with a hierarchical hyperprior to produce region-adaptive probability estimates. Extensive experiments on Kodak, CLIC, and Tecnick demonstrate that ANC achieves 12-18% BD-rate savings over the strongest learned baselines while adding negligible computational overhead. We further show that our adaptive entropy model generalizes across resolutions and domains without fine-tuning, enabling practical deployment in bandwidth-constrained settings.",

  motivation: {
    heading: "Why Adaptive Entropy Coding?",
    text: "Existing neural image codecs apply a single, globally-parameterized entropy model to every spatial location. This is suboptimal: smooth sky regions need far fewer bits than textured areas. Traditional codecs like VVC already exploit this via block-level mode decisions, but learned methods lack an analogous mechanism. Our key insight is that a lightweight attention module can learn to predict per-region complexity, enabling the entropy coder to allocate bits where they matter most without any hand-crafted heuristics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    imageCaption: "Bit allocation heatmap: warm = more bits, cool = fewer bits."
  },

  method: {
    heading: "Method Overview",
    text: "ANC augments a standard autoencoder-based codec with two additions: (1) a Spatial Attention Module (SAM) that produces per-pixel importance maps from the encoder's latent representation, and (2) a Hierarchical Adaptive Hyperprior that conditions the entropy parameters on both global image statistics and local attention scores.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&q=80",
    imageCaption: "Architecture: encoder -> SAM -> adaptive hyperprior -> arithmetic coder -> decoder.",
    technicalDetails:
      "**Spatial Attention Module (SAM):** Given encoder features F in R^(C x H x W), SAM applies channel-wise squeeze-excitation followed by a 1x1 convolution to produce attention map A in [0,1]^(1 x H x W).\n\n**Hierarchical Adaptive Hyperprior:** We extend the mean-scale hyperprior by conditioning the scale parameters sigma on both the hyper-latent z and the attention map A. Specifically, sigma = f_sigma(z, A), where f_sigma is a small MLP.\n\n**Training Objective:** L = R + lambda-D + alpha-L_attn, where L_attn = ||A - stopgrad(Ahat)||_2 is a self-consistency loss.\n\n**Computational Cost:** SAM adds only 0.3% FLOPs to the base model."
  },

  demo: {
    heading: "Interactive Demo",
    text: "Drag the slider to compare our method (ANC) with the baseline codec at the same bitrate. Notice how ANC preserves fine details in textured regions while achieving better overall quality.",
    videoUrl: null,
    gifUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80",
    gifCaption: "Side-by-side comparison at 0.15 bpp on a Kodak test image."
  },

  results: {
    heading: "Key Results",
    figures: [
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        caption: "Rate-distortion curves on Kodak: ANC (ours) vs. baselines."
      },
      {
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        caption: "BD-rate savings across datasets and quality levels."
      }
    ],
    findings: [
      "12-18% BD-rate savings over Cheng2020 and STF on Kodak, CLIC, and Tecnick.",
      "Attention maps correlate strongly (rho = 0.87) with human perceptual saliency annotations.",
      "Zero-shot generalization: models trained on 256x256 crops maintain gains on 2K resolution images.",
      "Negligible latency overhead: < 2% increase in decode time compared to the base model.",
      "Consistent improvements across all lambda values, with larger gains at lower bitrates."
    ]
  },

  summary: {
    heading: "Summary & Impact",
    text: "We have shown that adaptive, content-aware entropy coding is a simple yet powerful addition to neural image compression. By learning where to allocate bits, ANC achieves state-of-the-art rate-distortion performance with minimal computational overhead. Our approach is architecture-agnostic and can be integrated into any autoencoder-based codec.",
    highlights: [
      "First learned method to match VVC's adaptive bit allocation without hand-crafted heuristics.",
      "Open-source release with pre-trained models and a pip-installable library.",
      "Potential applications in video streaming, satellite imaging, and medical imaging compression."
    ]
  },

  bibtex: `@inproceedings{zhang2026adaptive,
  title     = {Adaptive Neural Compression via Learned Entropy Models},
  author    = {Zhang, Alice and Kumar, Bob and Chen, Carol and Park, David},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS)},
  year      = {2026},
  url       = {https://arxiv.org/abs/2025.00000}
}`,

  footer: {
    contactEmail: "alice.zhang@ucsd.edu",
    githubLink: "https://github.com/example/adaptive-neural-compression",
    citationNote: "If you find this work useful, please cite our paper using the BibTeX above.",
    copyright: "(c) 2026 Zhang et al. - UC San Diego"
  }
};

export default siteContent;
