export type Role = {
  id: "root" | "targets" | "snapshot" | "timestamp";
  name: string;
  question: string;
  detail: string;
};

export const roles: Role[] = [
  {
    id: "root",
    name: "Root",
    question: "Who do we trust?",
    detail:
      "Root metadata lists the keys that are authorized to sign every other role. It is the anchor of trust and the only role a client must trust in advance.",
  },
  {
    id: "targets",
    name: "Targets",
    question: "Which software should I receive?",
    detail:
      "Targets metadata describes the actual files: names, sizes and hashes. It tells the client exactly what a legitimate artifact looks like.",
  },
  {
    id: "snapshot",
    name: "Snapshot",
    question: "Do the metadata pieces belong together?",
    detail:
      "Snapshot metadata records which versions of the targets metadata belong to the same consistent view of the repository.",
  },
  {
    id: "timestamp",
    name: "Timestamp",
    question: "Is this metadata fresh?",
    detail:
      "Timestamp metadata is signed frequently and expires quickly, so a client can tell whether it is being served an outdated repository state.",
  },
];

export const steps: { title: string; body: string }[] = [
  {
    title: "Client requests an update",
    body: "The client asks the repository whether a newer version of an artifact exists.",
  },
  {
    title: "Receives TUF metadata",
    body: "Alongside the artifact, the repository returns timestamp, snapshot, targets and root metadata.",
  },
  {
    title: "Verifies signatures and metadata",
    body: "Starting from the trusted root keys, the client checks that every metadata file carries enough valid signatures.",
  },
  {
    title: "Checks freshness and target integrity",
    body: "Expiration times are compared against now, and the downloaded file is hashed and matched against targets metadata.",
  },
  {
    title: "Accepts the update",
    body: "Only if every check passes is the artifact handed to the installer. Any failure aborts the update.",
  },
];

export const concepts: { id: string; title: string; body: string; icon: "key" | "hash" | "clock" }[] = [
  {
    id: "compromise",
    title: "Key compromise",
    body: "TUF limits the impact of compromised keys through separated roles, signature thresholds and key rotation.",
    icon: "key",
  },
  {
    id: "integrity",
    title: "Integrity",
    body: "Hashes allow the client to detect modified software.",
    icon: "hash",
  },
  {
    id: "freshness",
    title: "Freshness",
    body: "Timestamp metadata helps detect stale metadata and freeze attacks.",
    icon: "clock",
  },
];

export const summary: { term: string; line: string }[] = [
  { term: "Trust", line: "Root keys define who may sign what." },
  { term: "Integrity", line: "Hashes prove the file was not modified." },
  { term: "Consistency", line: "Snapshot keeps metadata in one coherent view." },
  { term: "Freshness", line: "Expiring timestamps expose stale responses." },
  { term: "Compromise resilience", line: "One stolen key is not enough to ship an update." },
];
